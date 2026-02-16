from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

bcrypt = Bcrypt(app)

# MySQL connection
def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="nitik=007",  
        database="draftmypc"
    )

@app.route("/")
def home():
    return "Backend Connected!"

if __name__ == "__main__":
    app.run(debug=True)
