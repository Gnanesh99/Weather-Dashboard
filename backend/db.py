import mysql.connector

def get_db():

    db = mysql.connector.connect(
        host="localhost",
        user="root",
        password="#Harrypotterfan1234",
        database="weather_dashboard"
    )

    return db