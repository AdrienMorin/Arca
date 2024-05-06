import fitz  # This is PyMuPDF
import pytesseract
from pytesseract import Output
from PIL import Image
import io
import cv2
import numpy as np
import os

# Configure Tesseract command
from dotenv import load_dotenv
load_dotenv()
TESSERACT_PATH=os.getenv('TESSERACT_PATH')
pytesseract.pytesseract.tesseract_cmd = TESSERACT_PATH

def convert_pdf_to_images(pdf_path, dpi=300):
    """Converts each page of a PDF file to images using PyMuPDF with specified DPI for better quality."""
    doc = fitz.open(pdf_path)
    images = []
    for page in doc:
        zoom_x = dpi / 72  # 72 is the default DPI for PDFs in PyMuPDF
        zoom_y = dpi / 72
        mat = fitz.Matrix(zoom_x, zoom_y)  # Create the transformation matrix for the zoom
        pix = page.get_pixmap(matrix=mat)  # Apply the matrix transform to render the page
        img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
        images.append(img)
    doc.close()
    return images

def extract_text_from_img(img):
    """Extracts text from an image and calculates the overall confidence using Tesseract."""
    open_cv_image = cv2.cvtColor(np.array(img), cv2.COLOR_RGB2BGR)
    custom_config = r'--oem 3 --psm 6'
    data = pytesseract.image_to_data(img, lang='fra', output_type=Output.DICT, config=custom_config)
    res=""
    text=""
    total_confidence = 0
    num_words = 0
    for i in range(len(data['text'])):
        if int(data['conf'][i]) > -1:  # Filter out non-recognized words
            total_confidence += int(data['conf'][i])
            num_words += 1
        if(data['conf'][i]>0 and data['conf'][i]<=70):
            res+="$r"
        elif(data['conf'][i]>7 and data['conf'][i]<85):
            res+="$o"
        elif(data['conf'][i]>=85):
            res+="$g" 
        res+=data['text'][i]
        res+=" "
        text+=data['text'][i]
        text+=" "

    global_confidence = total_confidence / num_words if num_words > 0 else 0
    print(global_confidence)

    if global_confidence > 0.5:
        #text = pytesseract.image_to_string(img, lang='fra', config=custom_config)      
        res = res.encode("gbk", 'ignore').decode("gbk", "ignore")
        return text,res, global_confidence
    else:
        return None,None, global_confidence

def extractTextFromImg(pdf_path):
    """Processes each page of the PDF to extract text and calculate confidence, returns text if above threshold."""
    images = convert_pdf_to_images(pdf_path)
    all_texts = []
    all_res = []
    total_confidence = 0
    count_confidence = 0
    
    for img in images:
        text,res,confidence = extract_text_from_img(img)
        if text:
            all_texts.append(text)
            all_res.append(res)
            total_confidence += confidence
            count_confidence += 1

    average_confidence = total_confidence / count_confidence if count_confidence > 0 else 0
    if average_confidence > 90:
        return ' '.join(all_texts),' '.join(all_res)
    else:
        return None,None
