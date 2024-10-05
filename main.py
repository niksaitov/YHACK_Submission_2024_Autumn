from flask import Flask, jsonify, request
import requests
import config

app = Flask(__name__)

@app.route('/')
def home():
    return "welcome to flask"

@app.route('/get-subjects', methods=['GET'])
def get_subjects():
    
    api_url = f"https://gw.its.yale.edu/soa-gateway/course/webservice/v2/subjects?apikey={config.API_KEY}"

    try:
        # Make the request to the API
        response = requests.get(api_url)
        
        # Check if the request was successful
        if response.status_code == 200:
            # Return the JSON response from the API
            return jsonify(response.json())
        else:
            # Handle errors (non-200 status codes)
            return jsonify({'error': 'Failed to fetch subjects', 'status_code': response.status_code})
    
    except Exception as e:
        # Handle exceptions
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
