from flask import Flask, jsonify
import requests
import config

app = Flask(__name__)

@app.route('/')
def home():
    return "welcome to flask"

@app.route('/get-subjects', methods=['GET'])
def get_subjects():
    
    endpoint = "https://gw.its.yale.edu/soa-gateway/course/webservice/v2/subjects"
    mode = "json"
    api_url = f"{endpoint}?apikey={config.API_KEY}&mode={mode}"

    try:
        response = requests.get(api_url)
        
        # Check if the request was successful
        if response.status_code == 200:
            return response.json()
        else:
            return jsonify({'error': 'Failed to fetch subjects', 'status_code': response.status_code})
    
    except Exception as exc:
        return jsonify({'error': str(exc)})
    
@app.route('/get-subject-info', methods=['GET'])
def get_subject_info():
    
    endpoint = "https://gw.its.yale.edu/soa-gateway/courses/webservice/v3/index"
    subject_code = "ENGL"
    api_url = f"{endpoint}?apikey={config.API_KEY}&subjectCode={subject_code}"

    try:
        response = requests.get(api_url)
        
        # Check if the request was successful
        if response.status_code == 200:
            return response.json()
        else:
            return jsonify({'error': 'Failed to fetch subjects', 'status_code': response.status_code})
    
    except Exception as exc:
        return jsonify({'error': str(exc)})


if __name__ == '__main__':
    app.run(debug=True)
