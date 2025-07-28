from flask_jwt_extended import get_jwt_identity, create_access_token, jwt_required, set_access_cookies, unset_jwt_cookies
from flask import request, make_response, jsonify
from flask_restful import Resource
from server.controllers.image_controller import uploadImage, uploadDocument
from server.models import User
from server.config import db


class Register(Resource):
    def post(self):
        data = request.form
        print(data['name'])
        if User.query.filter_by(email=data.get('email')).first():
            return jsonify({'error': 'Email already registered.'}), 409

        user = User(
            name=data.get('name'),
            email=data.get('email'),
            role='Driver'
        )

        user.password_hash = data.get('password')
        print(request.files)
        if 'image' in request.files:
            user.image_url = uploadImage(request.files['image_url'], user.name)
        if request.files.get('license'):
            user.license = uploadDocument(request.files['license'], user.name)
        else:
            return make_response(jsonify({'error': 'Please upload your license.'}), 400)
        print(user.license)
        db.session.add(user)
        db.session.commit()
        print(user.to_dict())
        return make_response( user.to_dict(), 201)
