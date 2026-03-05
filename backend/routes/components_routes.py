import json
from flask import Blueprint, jsonify, request
from db import get_db_connection

components_routes = Blueprint("components_routes", __name__)

@components_routes.route("/components", methods=["GET"])
# API to get componenets for builder page 
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

# API to set new components in Admin dashboard page
@components_routes.route("/components", methods=["POST"])
def add_component():

    data = request.json

    conn = get_db_connection()
    cursor = conn.cursor()

    query = """
    INSERT INTO components
    (id,name,category,brand,model,price,performance_tier,image_url,specs,best_for)
    VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
    """

    cursor.execute(query, (
        data["id"],
        data["name"],
        data["category"],
        data["brand"],
        data["model"],
        data["price"],
        data["performanceTier"],
        data["imageUrl"],
        json.dumps(data["specs"]),
        json.dumps(data["bestFor"])
    ))

    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({"message": "Component added"})

# API to delete components in Admin dashboard
@components_routes.route("/components/<component_id>", methods=["DELETE"])
def delete_component(component_id):

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM components WHERE id=%s", (component_id,))
    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({"message": "Component deleted"})