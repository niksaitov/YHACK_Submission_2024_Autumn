from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return "welcome to flask"

if __name__ == "__main__":
    # change host's value to your own ip address
    # terminal command (look for some number like 192.168.x.x):
    #   Mac: ifconfig
    #   Windows: ipconfig
    app.run(host='127.0.0.1', port=5000)