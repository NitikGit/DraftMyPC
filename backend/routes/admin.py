from flask import Blueprint, request, jsonify
from db import get_db_connection

admin_routes = Blueprint("admin", __name__)

def admin_required(func):
    def wrapper(*args, **kwargs):
        # Let preflight pass through
        if request.method == "OPTIONS":
            return func(*args, **kwargs)

        role = request.headers.get("role")
        if role != "admin":
            return jsonify({"error": "Unauthorized"}), 403

        return func(*args, **kwargs)

    wrapper.__name__ = func.__name__
    return wrapper


@admin_routes.route("/admin/stats", methods=["GET"])
@admin_required
def admin_stats():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT COUNT(*) AS total FROM users")
    users = cursor.fetchone()["total"]

    cursor.execute("SELECT COUNT(*) AS total FROM builds")
    builds = cursor.fetchone()["total"]

    cursor.execute("SELECT COUNT(*) AS total FROM components")
    components = cursor.fetchone()["total"]

    cursor.close()
    conn.close()

    return jsonify({
        "users": users,
        "builds": builds,
        "components": components
    })