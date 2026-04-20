from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
from routes.upload import upload_bp
from routes.auth import auth_routes
from routes.builds import build_routes
from routes.components_routes import components_routes
from routes.admin import admin_routes

app = Flask(__name__)
bcrypt = Bcrypt(app)

@app.before_request
def handle_options():
    if request.method == "OPTIONS":
        response = app.make_default_options_response()
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type, role"
        response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
        return response

@app.after_request
def add_cors_headers(response):
response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, role"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    return response

app.register_blueprint(auth_routes)
app.register_blueprint(build_routes)
app.register_blueprint(components_routes)
app.register_blueprint(upload_bp)
app.register_blueprint(admin_routes)

@app.route("/")
def home():
    return "Backend Running"

if __name__ == "__main__":
    app.run(debug=True)