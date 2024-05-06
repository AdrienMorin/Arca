import os
import cv2
import io
import fitz  # PyMuPDF
from google.cloud import vision
from PIL import Image

# Set Google Cloud Vision credentials
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = r"../credentials.json"

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
        img_byte_arr = io.BytesIO()
        img.save(img_byte_arr, format='PNG')
        images.append(img_byte_arr.getvalue())
    doc.close()
    return images

def cloud_vision_text_extractor(image_bytes):
    """Uses Google Cloud Vision API to perform text detection on an image."""
    image = vision.Image(content=image_bytes)
    client = vision.ImageAnnotatorClient()
    response = client.document_text_detection(image=image)
    return response

def get_text_from_vision_response(response):
    texts = []
    confidences = []
    res=""
    text=""
    for page in response.full_text_annotation.pages:
        for block in page.blocks:
            for paragraph in block.paragraphs:
                for word in paragraph.words:
                    word_text = ''.join([symbol.text for symbol in word.symbols])
                    # Calculating average confidence of a word
                    word_confidence = sum([symbol.confidence for symbol in word.symbols]) / len(word.symbols)
                    texts.append(word_text)
                    confidences.append(word_confidence)
                    # Example to print each word with its confidence
                    #print(f"{word_text} (Confidence: {word_confidence:.2f})")
                    if(word_confidence>0.85):
                        res+=(f"$g{word_text}")
                    elif(word_confidence>0.7):
                        res+=(f"$o{word_text}")
                    else:
                        res+=(f"$r{word_text}")
                    res+=" "
                    text+=word_text
                    text+=" "
                    

    average_confidence = sum(confidences) / len(confidences) if confidences else 0

    print(average_confidence)
    if average_confidence > 0.10:
        return text,res,confidences


def process_pdf(pdf_path):
    """Processes each page of the PDF to extract text using Google Cloud Vision API."""
    images = convert_pdf_to_images(pdf_path)
    all_texts = []
    all_res = []
    total_confidence = 0
    num_confidences = 0
    
    for image_bytes in images:
        response = cloud_vision_text_extractor(image_bytes)
        texts,res,confidences = get_text_from_vision_response(response)
        all_texts.extend(texts)
        all_res.extend(res)
        total_confidence += sum(confidences)
        num_confidences += len(confidences)
    
    average_confidence = total_confidence / num_confidences if num_confidences > 0 else 0
    if average_confidence > 0.10:
        return ''.join(all_texts),''.join(all_res)
    else:
        return None,None
