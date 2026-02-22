from flask import Blueprint, request, jsonify
from db import get_db_connection
import json

build_routes = Blueprint("build_routes", __name__)

@build_routes.route("/builds", methods=["GET"])
def get_builds():
    user_id = request.args.get("user_id")

    conn = get_db_connection()
    cur = conn.cursor(dictionary=True)

    cur.execute(
        "SELECT * FROM builds WHERE user_id=%s",
        (user_id,)
    )

    builds = cur.fetchall()

    cur.close()
    conn.close()

    return jsonify(builds)


@build_routes.route("/builds", methods=["POST"])
def save_build():
    data = request.json

    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute(
        "INSERT INTO builds (user_id, name, components, total_price) VALUES (%s, %s, %s, %s)",
        (
            data["user_id"],
            data["name"],
            json.dumps(data["components"]),
            data["total_price"],
        ),
    )

    conn.commit()
    cur.close()
    conn.close()

    return jsonify({"message": "Saved"}), 201