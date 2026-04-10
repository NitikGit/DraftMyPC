from flask import Flask
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from routes.upload import upload_bp
from routes.auth import auth_routes
from routes.builds import build_routes
from routes.components_routes import components_routes

app = Flask(__name__)

#FIXED CORS
CORS(app)

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