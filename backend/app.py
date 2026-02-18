from flask import Flask
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from routes.auth import auth_routes

app = Flask(__name__)
CORS(app)

bcrypt = Bcrypt(app)

app.register_blueprint(auth_routes)

@app.route("/")
def home():
    return "Backend Running"

if __name__ == "__main__":
    app.run(debug=True)