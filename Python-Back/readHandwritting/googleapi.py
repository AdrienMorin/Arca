import os
import cv2
from google.cloud import vision

# Set Google Cloud Vision credentials
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = r"../credentials.json"
print('Credentials from environ: {}'.format(os.environ.get("GOOGLE_APPLICATION_CREDENTIALS")))

def cloud_vision_text_extractor(image_path):
    # Read the image file and convert to bytes
    handwritings = cv2.imread(image_path)
    _, encoded_image = cv2.imencode('.png', handwritings)
    content = encoded_image.tobytes()
    image = vision.Image(content=content)

    # Create a client and submit the handwriting image to the Google Cloud Vision API
    client = vision.ImageAnnotatorClient()
    response = client.document_text_detection(image=image)
    return response

def get_text_from_vision_response(response):
    # Extract and concatenate text from the response, including confidence levels
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
        return text,res
    else:
        return None,None
