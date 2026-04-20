import os

DB_HOST = os.environ.get("DB_HOST", "localhost")
DB_USER = os.environ.get("DB_USER", "draftuser")
DB_PASSWORD = os.environ.get("DB_PASSWORD", "draftpass123!")
DB_NAME = os.environ.get("DB_NAME", "draftmypc")
DB_PORT = int(os.environ.get("DB_PORT", 3306))