from flask import Flask
import tools

app = Flask(__name__)

@app.route('/')
def home():
    return "welcome to flask"

@app.route('/get-subjects', methods=['GET'])
def get_subjects():
    return tools.get_subjects_api_call()
    
@app.route('/get-subject-info', methods=['GET'])
def get_subject_info():
    return tools.get_subjects_info_api_call("ENGL")

if __name__ == '__main__':
    app.run(debug=True)