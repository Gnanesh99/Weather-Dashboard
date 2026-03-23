import mysql.connector
import os

def get_db():
    db = mysql.connector.connect(
        host=os.environ.get("DB_HOST"),
        user=os.environ.get("DB_USER"),
        password=os.environ.get("DB_PASSWORD"),
        database=os.environ.get("DB_NAME"),
        port=int(os.environ.get("DB_PORT")),
        connection_timeout=5,   # 🔥 prevents hanging
        ssl_disabled=True       # 🔥 IMPORTANT for Railway proxy
    )
    return db