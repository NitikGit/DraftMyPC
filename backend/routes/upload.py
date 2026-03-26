from flask import Blueprint, request, jsonify
from db import get_db_connection
import time
import json
import uuid
upload_bp = Blueprint("upload", __name__)

@upload_bp.route("/upload-csv", methods=["POST"])
def upload_csv():
    data = request.get_json()
    components = data.get("components", [])

    if not components:
        return jsonify({"error": "No components received"}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        for item in components:
            cursor.execute("""
                INSERT INTO components 
                (id, name, category, brand, model, price, performance_tier, image_url, specs, best_for, retailer_links)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                str(uuid.uuid4()),
                item.get("name"),
                item.get("category"),
                item.get("brand"),
                item.get("model"),
                item.get("price"),
                item.get("performanceTier"),  
                item.get("imageUrl"),
                json.dumps(item.get("specs", {})),
                json.dumps(item.get("bestFor", [])),
                None  
            ))

        conn.commit()

        return jsonify({
            "message": "CSV uploaded successfully",
            "insertedCount": len(components)
        })

    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500

    finally:
        cursor.close()
        conn.close()