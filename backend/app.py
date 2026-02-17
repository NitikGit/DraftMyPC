from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

bcrypt = Bcrypt(app)

@app.route("/")
def home():
    return "Backend Connected!"

if __name__ == "__main__":
    app.run(debug=True)
