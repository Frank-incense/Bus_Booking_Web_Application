from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from server.models.user import User
from server.config import db

auth_bp = Blueprint('auth', __name__)

##Register user

@auth_bp.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    name = data.get('name')
    role = data.get('role', 'Driver')
    image = data.get('image', None)

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'error': 'Email already exists'}), 409

    try:
        user = User(
            email=email,
            name=name,
            role=role,
            image=image
        )
        user.password_hash = password
        db.session.add(user)
        db.session.commit()

        return jsonify({'message': 'User registered successfully', 'user': user.to_dict()}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    
##Login user

@auth_bp.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not user.authenticate(password):
        return jsonify({'error': 'Invalid email or password'}), 401

    token = create_access_token(identity=user.id)

    return jsonify({
        'message': 'Login successful',
        'access_token': token,
        'user': user.to_dict()
    }), 200
