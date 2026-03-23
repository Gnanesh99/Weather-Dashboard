from flask import Blueprint, request, jsonify
from db import get_db
import bcrypt
import jwt
import datetime

auth_routes = Blueprint("auth", __name__)

SECRET = "weather_secret"


# =========================
# REGISTER
# =========================
@auth_routes.route("/register", methods=["POST"])
def register():
    try:
        data = request.json

        username = data["username"]
        email = data["email"]
        password = data["password"]

        hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

        db = get_db()
        cursor = db.cursor()

        cursor.execute(
            "INSERT INTO users (username, email, password) VALUES (%s, %s, %s)",
            (username, email, hashed)
        )

        db.commit()

        return jsonify({"message": "User registered"})

    except Exception as e:
        print("REGISTER ERROR:", str(e))
        return jsonify({"message": "Server error"}), 500


# =========================
# LOGIN (REAL VERSION)
# =========================
@auth_routes.route("/login", methods=["POST"])
def login():
    try:
        data = request.json
        email = data["email"]
        password = data["password"]

        db = get_db()
        cursor = db.cursor(dictionary=True)

        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()

        cursor.close()
        db.close()

        if not user:
            return jsonify({"message": "Invalid credentials"}), 401

        # check password
        if not bcrypt.checkpw(password.encode(), user["password"].encode()):
            return jsonify({"message": "Invalid credentials"}), 401

        # create token
        token = jwt.encode({
            "user_id": user["id"],
            "exp": datetime.datetime.utcnow() + datetime.timedelta(days=1)
        }, SECRET, algorithm="HS256")

        return jsonify({
            "message": "Login successful",
            "token": token,
            "user": {
                "id": user["id"],
                "username": user["username"],
                "email": user["email"]
            }
        })

    except Exception as e:
        print("LOGIN ERROR:", str(e))
        return jsonify({"message": "Server error"}), 500