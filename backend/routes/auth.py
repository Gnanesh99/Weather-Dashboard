from flask import Blueprint, request, jsonify
from db import get_db
import bcrypt
import jwt
import datetime

auth_routes = Blueprint("auth", __name__)

SECRET = "weather_secret"


@auth_routes.route("/register", methods=["POST"])
def register():

    data = request.json

    username = data["username"]
    email = data["email"]
    password = data["password"]

    hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

    db = get_db()
    cursor = db.cursor()

    cursor.execute(
        "INSERT INTO users (username,email,password) VALUES (%s,%s,%s)",
        (username, email, hashed)
    )

    db.commit()

    return jsonify({"message": "User registered"})


@auth_routes.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data["email"]
    password = data["password"]

    # 🔥 TEMPORARY TEST LOGIN (bypass DB)
    if email == "test@gmail.com" and password == "123":
        return jsonify({
            "message": "Login successful",
            "token": "dummy",
            "user": {"id": 1, "username": "Test User"}
        })

    return jsonify({"message": "Invalid credentials"}), 401