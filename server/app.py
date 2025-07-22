from flask import Flask, send_from_directory
from flask_bcrypt import Bcrypt
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from dotenv import load_dotenv
from flask_cors import CORS
from server.config import db 
import cloudinary
from server.routes.auth import auth_bp
import os


load_dotenv()

app = Flask(__name__)

CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)
app.config.from_prefixed_env(prefix='FLASK')
# db.init_app(app=app)
# migrate = Migrate(app=app, db=db)
bcrypt = Bcrypt(app=app)
jwt = JWTManager(app=app)
api = Api(app=app)

config = cloudinary.config(secure=True)

app.register_blueprint(auth_bp)


print("****1. Set up and configure the SDK:****\nCredentials: ", config.cloud_name, config.api_key, "\n")