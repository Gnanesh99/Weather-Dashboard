from flask import Blueprint, request, jsonify
from db import get_db

favorites_routes = Blueprint("favorites", __name__)


@favorites_routes.route("/add", methods=["POST"])
def add_favorite():

    data = request.json

    user_id = data["user_id"]
    city = data["city_name"]

    db = get_db()
    cursor = db.cursor()

    cursor.execute(
        "INSERT INTO favorites (user_id, city_name) VALUES (%s,%s)",
        (user_id, city)
    )

    db.commit()

    return jsonify({"message": "City added"})


@favorites_routes.route("/<user_id>")
def get_favorites(user_id):

    db = get_db()
    cursor = db.cursor(dictionary=True)

    cursor.execute(
        "SELECT * FROM favorites WHERE user_id=%s",
        (user_id,)
    )

    favorites = cursor.fetchall()

    return jsonify(favorites)