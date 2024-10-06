from flask import jsonify
from sqlalchemy import text
import pandas as pd
import requests
import config
import re

def extract_codes(json_data):
    course_codes = {item['code'] for item in json_data}
    return list(set(course_codes))

def is_faulty_response(response:dict):
    return (response[0].keys()[0] == "error")

def get_subjects_api_call():
    endpoint = "https://gw.its.yale.edu/soa-gateway/course/webservice/v2/subjects"
    api_url = f"{endpoint}?apikey={config.API_KEY}"
    response = requests.get(api_url)
    
    # check if the request failed
    if response.status_code == 200:
        return response.json()
    else:
        return jsonify({'error': 'Failed to fetch subjects', 'status_code': response.status_code})
    
def get_subjects_info_api_call(department_code):
    endpoint = "https://gw.its.yale.edu/soa-gateway/courses/webservice/v3/index"
    api_url = f"{endpoint}?apikey={config.API_KEY}&subjectCode={department_code}"
    response = requests.get(api_url)
    
    # check if the request was successful
    if response.status_code == 200:
        return response.json()
    else:
        return jsonify({'error': 'Failed to fetch subjects', 'status_code': response.status_code})
    
def get_detailed_descriptions():

    subjects = get_subjects_api_call()
    if (is_faulty_response(subjects)):
        return(subjects)
    
    unique_department_codes = extract_codes(subjects)
    all_courses_info = list()

    for department_code in unique_department_codes:
        department_sujbects_info = get_subjects_info_api_call(department_code)
        if (is_faulty_response(department_sujbects_info)): break
        all_courses_info += department_sujbects_info
  
    # df = pd.DataFrame(all_courses_info)
    # df.to_csv('output.csv', index=False)
    return all_courses_info    

def clean_text(text):
    if pd.isna(text):
        return "Value Not Provided"
    text = re.sub(r'<.*?>', '', str(text))
    text = re.sub(r'#&160;', '', str(text))  
    return text.strip()

def truncate_text(text):
    if len(text) <= 1020:
        return text
    truncated = text[:1020].rsplit(' ', 1)[0]
    return truncated + "..."

def clean_and_filter(path_to_csv):

    df = pd.read_csv(path_to_csv)
    desired_columns = ['courseNumber', 'courseTitle', 'crn', 'department', 'description', 'distDesg', 'meetingPattern', 'prerequisites']
    df_filtered = df[desired_columns]

    df_filtered.loc[:, 'description'] = df_filtered['description'].apply(clean_text)
    df_filtered.loc[:, 'prerequisites'] = df_filtered['prerequisites'].apply(clean_text)

    df_filtered.loc[:, 'department'] = df_filtered['department'].apply(truncate_text)
    df_filtered.loc[:, 'description'] = df_filtered['description'].apply(truncate_text)

    df_unique = df_filtered.drop_duplicates(subset='description')
    df_unique.to_csv('cleaned_courses.csv', index=False)

def perform_search(model, engine, description_search, department):
    
    # convert the search query into a vector
    search_vector = model.encode(description_search, normalize_embeddings=True).tolist()
    
    # search_vector_json = json.dumps(search_vector)

    # query the database for similar courses, filtering by department and limiting to top 5
    with engine.connect() as conn:
        with conn.begin():
            sql = text("""
                SELECT TOP 5 * FROM courses 
                WHERE (:department IS NULL OR department = :department)
                ORDER BY VECTOR_DOT_PRODUCT(description_vector, TO_VECTOR(:search_vector)) DESC
            """)
            results = conn.execute(sql, {'department': department, 'search_vector': str(search_vector)}).fetchall()


    formatted_courses = []
    
    for row in results:
        # Unpack the tuple and convert it into the required dictionary format
        course_dict = {
            'courseNumber': str(row[0]),  # Convert to string if not already
            'courseTitle': str(row[1]),
            'crn': str(row[2]),
            'department': str(row[3]),
            'description': str(row[4]),
            'distDesg': str(row[5]),
            'meetingPattern': str(row[6]),
            'prerequisites': str(row[7])
        }
        formatted_courses.append(course_dict)
    
    return jsonify(formatted_courses)
        
