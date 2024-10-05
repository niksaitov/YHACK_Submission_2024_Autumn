from flask import Flask, jsonify
import pandas as pd
import json
import requests
import config
import tools
import csv
import io

app = Flask(__name__)

@app.route('/')
def home():
    return "welcome to flask"

@app.route('/get-subjects', methods=['GET'])
def get_subjects():

    response = requests.get(api_url)
    
    # Check if the request failed
    if response.status_code != 200:
        return jsonify({'error': 'Failed to fetch subjects', 'status_code': response.status_code})
    else:
        return response.json()
    
@app.route('/get-subject-info', methods=['GET'])
def get_subject_info():
    
    endpoint = "https://gw.its.yale.edu/soa-gateway/courses/webservice/v3/index"
    department_code = "ENGL"
    api_url = f"{endpoint}?apikey={config.API_KEY}&subjectCode={department_code}"
    response = requests.get(api_url)
    
    # Check if the request was successful
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
    
    # Check if the request failed
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
@app.route('/get-subjects-to-csv', methods=['GET'])
def convert_json_to_csv():

    api_url = f"https://gw.its.yale.edu/soa-gateway/course/webservice/v2/subjects?apikey={config.API_KEY}"

    try:
        
        response = requests.get(api_url)

        if(response.status_code == 200):
            # populate a new csv file

            # Get the JSON data from the API (assuming it's a list)
            data = response.json()

            # Define the file path where you want to save the CSV file in your repo
            file_path = '/Users/rhou/YHACK_Submission_2024_Autumn/subjects.csv'

            # Open the CSV file in write mode
            with open(file_path, mode='w', newline='') as file:
                writer = csv.writer(file)

                # Add the CSV headers
                writer.writerow(['Code'])

                # Populate the CSV rows with data
                for subject in data:
                    writer.writerow([subject.get('code')])

            return jsonify({'message': f'Successfully created CSV at {file_path}'})
        else:
            # Handle errors (non-200 status codes)
            return jsonify({'error': 'Failed to fetch subjects', 'status_code': response.status_code})

    except Exception as e:
        # Handle exceptions
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)