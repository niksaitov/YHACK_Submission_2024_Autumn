from flask import Flask, jsonify
import pandas as pd
import json
import requests
import config
import tools

app = Flask(__name__)

@app.route('/')
def home():
    return "welcome to flask"

@app.route('/get-subjects', methods=['GET'])
def get_subjects():

    endpoint = "https://gw.its.yale.edu/soa-gateway/course/webservice/v2/subjects"
    response = requests.get(endpoint)
    
    # check if the request failed
    if response.status_code != 200:
        return jsonify({'error': 'Failed to fetch subjects', 'status_code': response.status_code})
    else:
        return response.json()
    
@app.route('/get-subject-info', methods=['GET'])
def get_subject_info():
    
    endpoint = "https://gw.its.yale.edu/soa-gateway/courses/webservice/v3/index"
    department_code = "ENGL" #placeholder
    api_url = f"{endpoint}?apikey={config.API_KEY}&subjectCode={department_code}"
    response = requests.get(api_url)
    
    # check if the request was successful
    if response.status_code == 200:
        return response.json()
    else:
        return jsonify({'error': 'Failed to fetch subjects', 'status_code': response.status_code})

@app.route('/test') 
def test():

    return "Go fuck urself"

def get_detailed_descriptions():

    endpoint = "https://gw.its.yale.edu/soa-gateway/course/webservice/v2/subjects"
    mode = "json"
    api_url = f"{endpoint}?apikey={config.API_KEY}&mode={mode}"

    response = requests.get(api_url)
    
    # check if the request failed
    if response.status_code != 200:
        return jsonify({'error': 'Failed to fetch subjects', 'status_code': response.status_code})
    else:
        subjects = response.json()
        unique_department_codes = tools.extract_codes(subjects)

    all_courses_info = list()
    endpoint = "https://gw.its.yale.edu/soa-gateway/courses/webservice/v3/index"
    for departmetn_code in unique_department_codes:

        api_url = f"{endpoint}?apikey={config.API_KEY}&subjectCode={departmetn_code}"
        response = requests.get(api_url)
        all_courses_info += response.json()

    # df = pd.DataFrame(all_courses_info)
    # df.to_csv('output.csv', index=False)

    return all_courses_info    

if __name__ == '__main__':
    app.run(debug=True)