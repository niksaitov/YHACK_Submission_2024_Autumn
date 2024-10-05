from flask import Flask
import tools

app = Flask(__name__)

@app.route('/')
def home():
    return "welcome to flask"

@app.route('/get-subjects', methods=['GET'])
def get_subjects():
    return tools.get_subjects_api_call()

    endpoint = "https://gw.its.yale.edu/soa-gateway/course/webservice/v2/subjects"
    mode = "json"
    api_url = f"{endpoint}?apikey={config.API_KEY}&mode={mode}"

    response = requests.get(api_url)
    
    # check if the request failed
    if response.status_code != 200:
        return jsonify({'error': 'Failed to fetch subjects', 'status_code': response.status_code})
    else:
        return response.json()
    
@app.route('/get-subject-info', methods=['GET'])
def get_subject_info():
    return tools.get_subjects_info_api_call("ENGL")

if __name__ == '__main__':
    app.run(debug=True)