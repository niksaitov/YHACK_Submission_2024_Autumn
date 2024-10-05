from flask import jsonify
import pandas as pd
import requests
import config

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
    if response.status_code != 200:
        return jsonify({'error': 'Failed to fetch subjects', 'status_code': response.status_code})
    else:
        return response.json()
    
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

def clean_and_filter(path_to_csv):

    df = pd.read_csv(path_to_csv)
    desired_columns = ['courseNumber', 'courseTitle', 'crn', 'department', 'description', 'distDesg', 'meetingPattern', 'prerequisites']
    df_filtered = df[desired_columns]
    
    df_unique = df_filtered.drop_duplicates(subset='description')
    df_unique.to_csv('cleaned_courses.csv', index=False)