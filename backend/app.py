import os

from flask import Flask, send_from_directory
from flask_cors import CORS

from routes.auth import auth_routes
from routes.weather import weather_routes
from routes.favorites import favorites_routes

# Serve frontend folder
app = Flask(__name__, static_folder="../frontend", static_url_path="")

CORS(app)

# API routes
app.register_blueprint(auth_routes, url_prefix="/api/auth")
app.register_blueprint(weather_routes, url_prefix="/api/weather")
app.register_blueprint(favorites_routes, url_prefix="/api/favorites")

# Serve main page
@app.route("/")
def serve_home():
    return send_from_directory("../frontend", "login.html")

# Serve all frontend files (css, js, html)
@app.route("/<path:path>")
def serve_files(path):
    return send_from_directory("../frontend", path)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)