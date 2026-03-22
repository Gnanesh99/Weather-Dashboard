import os

from flask import Flask
from flask_cors import CORS

from routes.auth import auth_routes
from routes.weather import weather_routes
from routes.favorites import favorites_routes

app = Flask(__name__)

CORS(app)

app.register_blueprint(auth_routes, url_prefix="/api/auth")
app.register_blueprint(weather_routes, url_prefix="/api/weather")
app.register_blueprint(favorites_routes, url_prefix="/api/favorites")

@app.route("/")
def home():
    return "Weather Dashboard API Running"

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)