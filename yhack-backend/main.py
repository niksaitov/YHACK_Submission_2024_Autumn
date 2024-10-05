from sentence_transformers import SentenceTransformer
from sqlalchemy import create_engine
from flask import Flask, request
import tools
import os

app = Flask(__name__)

username = 'demo', password = 'demo'
hostname = os.getenv('IRIS_HOSTNAME', 'localhost')
port = '1972' 
namespace = 'USER'
CONNECTION_STRING = f"iris://{username}:{password}@{hostname}:{port}/{namespace}"
engine = create_engine(CONNECTION_STRING)

# load model (for generating description vectors)
model = SentenceTransformer('all-MiniLM-L6-v2') 

@app.route('/')
def home():
    return "welcome to flask"

@app.route('/get-subjects', methods=['GET'])
def get_subjects():
    return tools.get_subjects_api_call()
    
@app.route('/get-subject-info', methods=['GET'])
def get_subject_info():
    return tools.get_subjects_info_api_call("ENGL")

@app.route('/search', methods=['POST'])
def search_courses():

    data = request.json
    description_search = data['query']  # get the search query from the request
    department = data['department'].lower()  # convert department to lowercase for lookup

    return tools.perform_search(model, engine, description_search, department)

if __name__ == '__main__':
    app.run(debug=True)