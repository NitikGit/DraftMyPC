from db import get_db_connection
#Insert a new user into the database 
def create_user(username, email, hashed_password):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO users (username, email, password) VALUES (%s, %s, %s)",
        (username, email, hashed_password)
    )

    conn.commit()
    cursor.close()
    conn.close()

#Retrive info to validate login
def get_user_by_email(email):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
    user = cursor.fetchone()

    cursor.close()
    conn.close()

    return user
