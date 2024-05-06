from flask import Flask, request, abort
import boto3
import os
from dotenv import load_dotenv
import pymongo
from pymongo.errors import ConnectionFailure
import readHandwritting.tesseractScript as tesseractScript
import readHandwritting.googleapi as googleapi
import readHandwritting.tesseractpdf as tesseractpdf
import readHandwritting.googleapipdf as googleapipdf
import linkPostgresText.link as link
import readHandwritting.docxToText as docxToText
import readHandwritting.csvToText as csvToText
from functools import wraps
from gevent.lock import Semaphore
import ssl  # Import SSL module
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask import jsonify

semaphore = Semaphore(10)

app = Flask(__name__)
limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["200 per day", "50 per hour"],
    storage_uri="memory://",
)


def limit_concurrent_requests(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not semaphore.acquire(blocking=False):
            return jsonify({'error': 'Too many requests, please try again later'}), 429
        try:
            return f(*args, **kwargs)
        finally:
            semaphore.release()
    return decorated_function

# Load environment variables from .env file
load_dotenv()

# AWS S3 Configuration
S3_KEY = os.getenv('S3_KEY')
S3_SECRET = os.getenv('S3_SECRET')
S3_BUCKET = os.getenv('S3_BUCKET')
S3_REGION = os.getenv('S3_REGION')
MONGO_KEY = os.getenv('MONGO_KEY')
API_KEY = os.getenv('API_KEY')

# MongoDB client setup
mongo_client = pymongo.MongoClient(MONGO_KEY)
try:
    # The ismaster command is cheap and does not require auth.
    mongo_client.admin.command('ismaster')
    print("MongoDB connection successful")
except ConnectionFailure:
    print("MongoDB connection failed")
db = mongo_client['reviewDB']
collection = db['review']

def create_json_document(txt, set_city, set_person, filename, id):
    villes = list(set_city)
    personnes = list(set_person)
    document_json = {
        "_id":id,
        "filename":filename,
        "retranscription": txt,
        "towns": villes,
        "people": personnes
    }
    print(document_json)
    return document_json

def require_api_key(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if request.headers.get('x-api-key') and request.headers.get('x-api-key') == API_KEY:
            return f(*args, **kwargs)
        else:
            abort(401)  # Unauthorized
    return decorated_function

@app.route('/create_metadata', methods=['POST'])
@require_api_key
@limiter.limit("10/minute")
@limit_concurrent_requests
def download_file():
    print("Request received")
    data = request.json
    filename = data['filename']
    id = data['id']

    if not filename:
        return "File key is missing", 400

    try:
        s3 = boto3.client(
            's3',
            aws_access_key_id=S3_KEY,
            aws_secret_access_key=S3_SECRET,
            region_name=S3_REGION
        )
        filename = os.path.basename(filename)
        s3.download_file(S3_BUCKET, filename, filename)

        _, extension = os.path.splitext(filename)
        audio_extensions = ['.mp3', '.wav', '.m4a', '.aac']
        txt = ""
        textcond = ""
        print(extension)
        if extension.lower() not in audio_extensions:
            if extension.lower() == '.pdf':
                txt, textcond = tesseractpdf.extractTextFromImg(filename)
                if not txt:
                    txt, textcond = googleapipdf.process_pdf(filename)
            elif extension.lower() == '.docx':
                txt = docxToText.docx_text_extractor(filename)
            elif extension.lower() == '.xlsx':
                txt = csvToText.xlsx_text_extractor(filename)
            else:
                txt, textcond = tesseractScript.extractTextFromImg(filename)
                if not txt:
                    response = googleapi.cloud_vision_text_extractor(filename)
                    txt, textcond = googleapi.get_text_from_vision_response(response)
            if txt:
                set_city = set()
                set_person = set()
                link.search_data(txt, set_city, set_person)
                document_json = create_json_document(txt, set_city, set_person, filename,id)
                collection.insert_one(document_json)
        os.remove(filename)
        return "ok", 200

    except Exception as e:
        if os.path.exists(filename):
            os.remove(filename)
        return str(e), 500

if __name__ == '__main__':
    # SSL context creation
    context = ssl.SSLContext(ssl.PROTOCOL_TLS)
    context.load_cert_chain('cert.pem', 'key.pem')

    # Run Flask app with HTTPS support
    app.run(host='0.0.0.0', port=5000, ssl_context=context)
