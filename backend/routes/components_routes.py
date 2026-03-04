import json
from flask import Blueprint, jsonify
from db import get_db_connection

components_routes = Blueprint("components_routes", __name__)

@components_routes.route("/components", methods=["GET"])
def get_components():

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM components")
    rows = cursor.fetchall()

    components = []

    for row in rows:
        components.append({
            "id": row["id"],
            "name": row["name"],
            "category": row["category"],
            "brand": row["brand"],
            "model": row["model"],
            "price": row["price"],
            "performanceTier": row["performance_tier"],
            "imageUrl": row["image_url"],
            "specs": json.loads(row["specs"]) if row["specs"] else {},
            "bestFor": json.loads(row["best_for"]) if row["best_for"] else [],
            "retailerLinks": json.loads(row["retailer_links"]) if row["retailer_links"] else []
        })

    cursor.close()
    conn.close()

    return jsonify(components)