from IPython.display import Image
from matplotlib import pyplot as plt
import pandas as pd, numpy as np
pd.options.display.float_format = '{:,.2f}'.format

import io
import os, cv2
# os.chdir(os.getcwd())
# filename = "text.jpg"
# filepath = os.path.join(os.getcwd(), filename)

import pandasql as ps

import warnings
warnings.simplefilter("ignore")

# Extract text from image with two columns of contents
import re
import cv2
import pytesseract
from pytesseract import Output

# tell pytesseract where the engine is installed
from dotenv import load_dotenv
load_dotenv()
TESSERACT_PATH=os.getenv('TESSERACT_PATH')
pytesseract.pytesseract.tesseract_cmd = TESSERACT_PATH

def extractTextFromImg(img_path):
    img = cv2.imread(img_path) 
    # Configure tesseract to provide confidence scores
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

    if global_confidence > 50:
        #text = pytesseract.image_to_string(img, lang='fra', config=custom_config)      
        res = res.encode("gbk", 'ignore').decode("gbk", "ignore")
        return text,res
    else:
        return None,None

