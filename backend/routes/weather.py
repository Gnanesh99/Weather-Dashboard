from flask import Blueprint, jsonify
import requests

weather_routes = Blueprint("weather", __name__)

API_KEY = "69aaabf4297c0befd02725b66da54467"


@weather_routes.route("/current/<city>")
def current_weather(city):

    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"

    response = requests.get(url)

    return jsonify(response.json())


@weather_routes.route("/forecast/<city>")
def forecast(city):

    url = f"https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={API_KEY}&units=metric"

    response = requests.get(url)

    return jsonify(response.json())