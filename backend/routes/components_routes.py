from flask import Blueprint, jsonify
from db import get_db_connection

components_routes = Blueprint("components_routes", __name__)

@components_routes.route("/components", methods=["GET"])
def get_components():

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM components")
    components = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(components)