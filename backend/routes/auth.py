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

    db = get_db()
    cursor = db.cursor(dictionary=True)

    cursor.execute("SELECT * FROM users WHERE email=%s", (email,))
    user = cursor.fetchone()

    if user and bcrypt.checkpw(password.encode(), user["password"].encode()):
        
        token = jwt.encode(
            {"user_id": user["id"], "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)},
            SECRET,
            algorithm="HS256"
        )

        if isinstance(token, bytes):
            token = token.decode()

        return jsonify({
            "message": "Login successful",
            "token": token,
            "user": {
                "id": user["id"],
                "username": user["username"]
            }
        })

    else:
        return jsonify({"message": "Invalid credentials"}), 401