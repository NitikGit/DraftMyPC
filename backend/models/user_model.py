from db import get_db_connection

#Insert a new user into the database 
def create_user(username, email, password):
    conn = get_db_connection()
    cursor = conn.cursor()

    query = "INSERT INTO users (username, email, password) VALUES (%s, %s, %s)"
    cursor.execute(query, (username, email, password))

    conn.commit()
    cursor.close()
    conn.close()


#Retrive info to validate login
def get_user_by_email(email):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    query = "SELECT * FROM users WHERE email = %s"
    cursor.execute(query, (email,))
    user = cursor.fetchone()

    cursor.close()
    conn.close()

    return user