from flask import Blueprint, request, jsonify
from flask_jwt_extended import unset_access_cookies, create_access_token, set_access_cookies, jwt_required, get_jwt_identity
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

import logging

@auth_bp.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    logging.info(f"Login attempt for email: {email}")

    if not email or not password:
        logging.warning("Login failed: Email and password are required")
        return jsonify({'error': 'Email and password are required'}), 400

    user = User.query.filter_by(email=email).first()
    print(user)
    if not user:
        logging.warning(f"Login failed: User with email {email} not found")
        return jsonify({'error': 'Invalid email or password'}), 401

    if not user.authenticate(password):
        logging.warning(f"Login failed: Incorrect password for email {email}")
        return jsonify({'error': 'Invalid email or password'}), 401

    if not user.is_approved:
        logging.warning(f"Login failed: User {email} not approved")
        return jsonify({'error': 'User not approved'}), 403

    if not user.is_active:
        logging.warning(f"Login failed: User {email} not active")
        return jsonify({'error': 'User not active'}), 403

    token = create_access_token(identity=user.id, expires_delta=False)
    response = jsonify({
        'message': 'Login successful',
        'access_token': token,
        'user': user.to_dict()
    })
    set_access_cookies(response, token)

    logging.info(f"Login successful for email: {email}")

    return response, 200


@auth_bp.route('/api/me', methods=['GET'])
@jwt_required()
def me():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({'error': 'User not found'}), 404

    return jsonify({'user': user.to_dict()}), 200

##logout user

@auth_bp.route('/api/logout', methods=['POST'])
@jwt_required()

def logout():
    response = jsonify({'message': 'Successfully logged out'})
    unset_jwt_cookies(response)
    return response, 200
