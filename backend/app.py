from flask import Flask
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from routes.upload import upload_bp
from routes.auth import auth_routes
from routes.builds import build_routes
from routes.components_routes import components_routes
from flask import request, jsonify

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)
bcrypt = Bcrypt(app)

app.register_blueprint(auth_routes)
app.register_blueprint(build_routes)
app.register_blueprint(components_routes)
app.register_blueprint(upload_bp)

@app.route("/")
def home():
    return "Backend Running"

if __name__ == "__main__":
    app.run(debug=True)

