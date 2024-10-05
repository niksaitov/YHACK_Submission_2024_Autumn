import os, pandas as pd
from sentence_transformers import SentenceTransformer
from sqlalchemy import create_engine, text
from flask import Flask, request, jsonify

app = Flask(__name__)

username = 'demo'
password = 'demo'
hostname = os.getenv('IRIS_HOSTNAME', 'localhost')
port = '1972' 
namespace = 'USER'
CONNECTION_STRING = f"iris://{username}:{password}@{hostname}:{port}/{namespace}"
engine = create_engine(CONNECTION_STRING)

# load your model (for generating description vectors)
model = SentenceTransformer('all-MiniLM-L6-v2') 

# create a department lookup table
department_lookup = {
    'computer science': 'CPSC',
    'political science': 'PSCI',
    'mathematics': 'MATH',
    'biology': 'BIOL',
    'economics': 'ECON',
}
# function to search courses based on user input
@app.route('/search', methods=['POST'])
def search_courses():
    data = request.json
    description_search = data['query']  # get the search query from the request
    department = data['department'].lower()  # convert department to lowercase for lookup
    
    # use the lookup table to get the abbreviation
    # department_code = department_lookup.get(department, department)  
    # default to the original name if no match is found

    # convert the search query into a vector
    search_vector = model.encode(description_search, normalize_embeddings=True).tolist()

    # query the database for similar courses, filtering by department and limiting to top 5
    with engine.connect() as conn:
        sql = text("""
            SELECT TOP 5 * FROM courses 
            WHERE (:department IS NULL OR department = :department)
            ORDER BY VECTOR_DOT_PRODUCT(description_vector, TO_VECTOR(:search_vector)) DESC
        """)
        results = conn.execute(sql, {'department': department, 'search_vector': search_vector}).fetchall()

        # format the results and return them to the client
    courses = [
        {
            'courseNumber': row['courseNumber'], 
            'courseTitle': row['courseTitle'], 
            'crn': row['crn'], 
            'department': row['department'], 
            'description': row['description'],
            'distDesg': row['distDesg'], 
            'meetingPattern': row['meetingPattern'], 
            'prerequisites': row['prerequisites'], 
            'description_vector': row['description_vector']  # return the vector if necessary, or remove it
        }
        for row in results
    ]
        
    return jsonify(courses)    

if __name__ == '__main__':
    app.run(debug=True)