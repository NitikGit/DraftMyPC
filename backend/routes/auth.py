from flask import Blueprint, request, jsonify
from flask_bcrypt import Bcrypt
from models.user_model import create_user, get_user_by_email

auth_routes = Blueprint("auth", __name__)
bcrypt = Bcrypt()

@auth_routes.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    username = data["username"]
    email = data["email"]
    password = data["password"]

    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

    try:
        create_user(username, email, hashed_password)
        return jsonify({"message": "User registered successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@auth_routes.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    email = data["email"]
    password = data["password"]

    user = get_user_by_email(email)

    if user and bcrypt.check_password_hash(user["password"], password):
        return jsonify({
            "message": "Login successful",
            "role": user["role"]
        }), 200

    return jsonify({"error": "Invalid credentials"}), 401
