from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from config import Config

# Global extensions
jwt = JWTManager()
db = SQLAlchemy()


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    jwt.init_app(app)
    CORS(app)

    from .routes import main
    from .auth import auth

    app.register_blueprint(main)
    app.register_blueprint(auth, url_prefix='/auth')
    with app.app_context():
        db.create_all()
        print("Database tables created!")

    return app