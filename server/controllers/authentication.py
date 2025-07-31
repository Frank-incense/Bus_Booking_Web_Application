from flask_jwt_extended import get_jwt_identity, create_access_token, jwt_required, set_access_cookies, unset_jwt_cookies
from flask import request, make_response, jsonify
from flask_restful import Resource
from server.controllers.image_controller import uploadImage, uploadDocument
from server.models import User
from server.config import db
from flask_mail import Message


class Register(Resource):
    def post(self):
        from server.app import mail
        data = request.form
        print(data['name'])
        if User.query.filter_by(email=data.get('email')).first():
            return make_response(jsonify({'error': 'Email already registered.'}), 409)

        user = User(
            name=data.get('name'),
            email=data.get('email'),
            role='Driver'
        )

        user.password_hash = data.get('password')
        
        if request.files.get('image_url'):
            user.image_url = uploadImage(request.files['image_url'], user.name, 'drivers')
            
        if request.files.get('license'):
            user.license = uploadDocument(request.files['license'], user.name)
        else:
            return make_response(jsonify({'error': 'Please upload your license.'}), 400)
        
        db.session.add(user)
        db.session.commit()
        message = Message(subject='Welcome to Journeyhub – Start Managing Your Trips Seamlessly!',sender='support@journeyhub.com',recipients=[user.email])
        message.body = f'''
Hi {user.name},

Thank you for signing up to Journeyhub – the smart way to manage and grow your bus operations.

Your registration has been received and is currently under review by our team. We’re ensuring everything is in order so you can enjoy a seamless experience managing your trips and connecting with passengers.

What’s next?
✅ We’ll review your submitted details
✅ You’ll receive an email notification once your account is approved
✅ Upon approval, you can start creating and managing trips from your dashboard

In the meantime, if you have any questions or need to update your registration information, feel free to reach out to us at support@journeyhub.com.

Thank you for your patience, and welcome to the Journeyhub community!

Warm regards,
The Journeyhub Team
                    ''' 
        # mail.send(message)
        return make_response( jsonify(user.to_dict()), 201)
