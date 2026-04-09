from flask import Blueprint, request, jsonify
from flask_bcrypt import Bcrypt
from models.user_model import create_user, get_user_by_email

auth_routes = Blueprint("auth", __name__)
bcrypt = Bcrypt()

# Route for user registration
@auth_routes.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    username = data["username"]
    email = data["email"]
    password = data["password"]

    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

    try:
        # Save user to database
        create_user(username, email, hashed_password)
        return jsonify({"message": "User registered successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Route for user login
@auth_routes.route("/login", methods=["POST"])
def login():
    
    data = request.get_json()

# Extract email and password from request
    email = data["email"]
    password = data["password"]

    user = get_user_by_email(email)

    if user and bcrypt.check_password_hash(user["password"], password):
        return jsonify({
            "message": "Login successful",
            "user": {
                "id": user["id"],
                "username": user["username"],
                "email": user["email"],
                "role": user.get("role", "user"),
            }
        }), 200

    return jsonify({"error": "Invalid credentials"}), 401


#routes for forget password (demo purpose so email redirects directly)

@auth_routes.route("/forgot-password", methods=["POST"])
def forgot_password():
    data = request.get_json()

    email = data["email"]
    new_password = data["new_password"]

    user = get_user_by_email(email)

    if not user:
        return jsonify({"error": "User not found"}), 404

    hashed_password = bcrypt.generate_password_hash(new_password).decode("utf-8")

    conn = get_db_connection()
    cursor = conn.cursor()

    query = "UPDATE users SET password = %s WHERE email = %s"
    cursor.execute(query, (hashed_password, email))

    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"message": "Password updated successfully"}), 200