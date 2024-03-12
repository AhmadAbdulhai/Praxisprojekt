from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
import os





db = SQLAlchemy()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    database_user = os.getenv('DATABASE_USER')
    database_password = os.getenv('DATABASE_PASSWORD')
    database_host = os.getenv('DATABASE_HOST')
    database_port = os.getenv('DATABASE_PORT')
    database_name = os.getenv('DATABASE_NAME')

    app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{database_user}:{database_password}@{database_host}:{database_port}/{database_name}'

    # Laden des privaten Schlüssels aus dem Volume
    with open('private_key.pem', 'r') as key_file:
        app.config['JWT_PRIVATE_KEY'] = key_file.read()

    app.config['JWT_ALGORITHM'] = 'RS256'

    db.init_app(app)
    jwt.init_app(app)
    
    with app.app_context():
        from .models import User
        db.create_all()

    from .routes import bp as auth_bp
    app.register_blueprint(auth_bp)
    
    return app
