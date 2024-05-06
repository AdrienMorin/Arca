import string
import nltk
import psycopg2
from dotenv import load_dotenv
import os

def download_nltk():
    nltk.download('punkt')
    nltk.download('averaged_perceptron_tagger')
    nltk.download('wordnet')
    nltk.download('stopwords')
    
def clean_text(text):
    translator = str.maketrans(string.punctuation, ' ' * len(string.punctuation))
    text = text.translate(translator)
    # Tokenize
    tokens = nltk.word_tokenize(text)
    # Lowercase
    tokens = [word.lower() for word in tokens]
    # Remove non-alphanumeric words
    tokens = [word for word in tokens if word.isalnum()]
    return tokens

#Create a set of all cities in the database
def create_city_postgre_set():
    load_dotenv()
    conn = psycopg2.connect( 
    database=os.getenv("PG_DB_NAME"), user=os.getenv("PG_USER"),  
    password=os.getenv("PG_PASSWORD"), host=os.getenv("PG_HOST"), port=os.getenv("PG_PORT")
    )
    cursor=conn.cursor()
    sql="SELECT cityname,displayname FROM locations"
    cursor.execute(sql)
    rows = cursor.fetchall()
    dico=dict()
    for row in rows:
        dico[row[0]]=row[1]
    conn.commit()
    conn.close()
    return dico

def create_person_postgre_set():
    load_dotenv()
    conn = psycopg2.connect( 
    database=os.getenv("PG_DB_NAME"), user=os.getenv("PG_USER"),  
    password=os.getenv("PG_PASSWORD"), host=os.getenv("PG_HOST"), port=os.getenv("PG_PORT")
    )
    cursor=conn.cursor()
    sql="SELECT firstname,lastname,id FROM people"
    cursor.execute(sql)
    rows = cursor.fetchall()
    names_ids={}
    for row in rows:
        names_ids[row[1]+" "+row[0]]=row[2]
        names_ids[row[0]+" "+row[1]]=row[2]
    conn.commit()
    conn.close()
    return names_ids

def get_combinations(text):
    combinations = set()
    for i in range(len(text)):
        for j in range(i+1, i+5):
            combinations.add(" ".join(text[i:min(j, len(text))]))
    return combinations

def getObjects(combinations,city_set,city_set_final, person_set,person_set_final):
    
    for combination in combinations:
        if combination in person_set:
            person_set_final.add(person_set[combination])
        if combination in city_set:
            city_set_final.add(city_set[combination])
    return 1


def search_data(text,set_city,set_person):
    download_nltk()
    set_city_postgre=create_city_postgre_set()
    set_person_postgre=create_person_postgre_set()
    text=clean_text(text)
    combinations=get_combinations(text)
    getObjects(combinations,set_city_postgre,set_city,set_person_postgre,set_person)
    print(set_city)
    # print(set_city_final)
    # print(set_person_final)
    return 1

# set_city=set()
# set_person=set()
# text="je m'appelle victo le saint et j'habite a aubenas"
# search_data(text,set_city,set_person)
