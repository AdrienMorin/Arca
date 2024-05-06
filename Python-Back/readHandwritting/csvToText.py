import pandas as pd

def xlsx_text_extractor(file_path):
    df = pd.read_excel(file_path)
    full_text = df.to_string(index=False)
    return full_text