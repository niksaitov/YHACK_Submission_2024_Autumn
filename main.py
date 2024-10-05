from flask import Flask, jsonify
import requests
import config
import csv
import io

app = Flask(__name__)

@app.route('/')
def home():
    return "welcome to flask"

@app.route('/get-subjects', methods=['GET'])
def get_subjects():

    try:
        api_url = f"https://gw.its.yale.edu/soa-gateway/course/webservice/v2/subjects?apikey={config.API_KEY}"
        
    
    api_url = 'http://example.com/soa-gateway/course/webservice/v2/subjects'
    
    try:
        # Make the request to the API
        response = requests.get(api_url)
        
        # Check if the request was successful
        if response.status_code == 200:
            return response.json()
        else:
            return jsonify({'error': 'Failed to fetch subjects', 'status_code': response.status_code})
    
    except Exception as e:
        # Handle exceptions
        return jsonify({'error': str(e)})
    
@app.route('/get-subjects-to-csv', methods=['GET'])
def convert_json_to_csv():

    try:
        api_url = f"https://gw.its.yale.edu/soa-gateway/course/webservice/v2/subjects?apikey={config.API_KEY}"
        
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