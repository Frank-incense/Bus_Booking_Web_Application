from flask_jwt_extended import get_jwt_identity, create_access_token, jwt_required, set_access_cookies, unset_jwt_cookies
from flask import request, make_response, jsonify
from server.models import (User, Operator, Booking, Trip, 
                           Route, Bus, Booking, Comment)
from server.controllers.image_controller import uploadDocument, uploadImage
from sqlalchemy import func
from server.config import db
from flask_restful import Resource

def str_to_bool(value):
    return str(value).lower() in ['true', '1', 'yes', 'on']
class AdminSummary(Resource):

    def get(self):
        drivers = User.query.filter_by(role='Driver').all()
        users = User.query.all()
        bookings = Booking.query.all()
        routes = Route.query.all()

        return make_response(jsonify({
            'drivers': len(drivers),
            'users': len(users),
            'bookings': len(bookings),
            'routes': len(routes)
        }), 200)
    
class Approve(Resource):
    def patch(self, id):
        data = request.get_json()
        print(data)
        user = User.query.filter_by(id=id).first()
        print(user)
        if user:
            for attr in data:
                setattr(user, attr, data[attr])
            
            db.session.add(user)
            db.session.commit()

            return make_response(user.to_dict(), 201)
        
        return make_response({
            'Error': 'User does not exist.'
        }, 404)

class PendingApprovals(Resource):
    def get(self):
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 4))

        pagination = User.query.filter_by(is_approved=False)\
            .order_by(User.created_at.desc())\
            .paginate(page=page, per_page=per_page, error_out=False)
            
        users = pagination.items

        if users:
            return make_response({
                'data': [user.to_dict() for user in users],
                'total': pagination.total,
                'pages': pagination.pages,
                'current_page': pagination.page,
                'per_page': pagination.per_page,
            }, 200)
        return make_response({'Error': 'No users found'}, 400)
    
class BookingStats(Resource):
    def get(self):
        results = (
            db.session.query(
                func.date_trunc('month', Booking.created_at).label('month'),
                func.count(Booking.id).label('booking_count')
            )
            .group_by(func.date_trunc('month', Booking.created_at))
            .order_by(func.date_trunc('month', Booking.created_at))
            .all()
        )

        response = [
            {
                'month': result.month.strftime('%Y-%m'),
                'count': result.booking_count
            }
            for result in results
        ]
        return jsonify(response), 200

class Driver(Resource):
    def get(self):
        users = User.query.filter_by(role='Driver').all()

        if users:
            for user in users:
                if user.license:
                    user.license = user.license.replace('/upload/', '/upload/fl_attachment:false/')
            return make_response([user.to_dict() for user in users], 200)
        return make_response({
            'Error': 'No drivers found.'
        }, 400)
    
class Users(Resource):
    def get(self):
        # Get pagination params from query string
        page = request.args.get('page', default=1, type=int)
        per_page = request.args.get('per_page', default=10, type=int)

        # Query users with pagination
        pagination = User.query.paginate(page=page, per_page=per_page, error_out=False)

        users = [user.to_dict() for user in pagination.items]

        return make_response(jsonify({
            "data": users,
            "total": pagination.total,
            "pages": pagination.pages,
            "current_page": pagination.page,
            "per_page": pagination.per_page
        }), 200)
    
    def post(self):
        data = request.form

        # Basic validation
        required_fields = ['name', 'email', 'phone', 'password', 'role']
        for field in required_fields:
            if not data.get(field):
                return make_response(jsonify({"error": f"{field} is required"}), 400)

        # Check if email already exists
        if User.query.filter_by(email=data['email']).first():
            return make_response(jsonify({"error": "Email already registered"}), 409)
        print(data.get('is_approved'), data.get('is_active'))
        try:
            
            new_user = User(
                name=data['name'],
                email=data['email'],
                phone=data['phone'],
                is_approved=str_to_bool(data.get('is_approved')),
                is_active=str_to_bool(data.get('is_active')),
                role=data['role']
            )
            new_user.password_hash = data.get('password')

            if 'image_url' in request.files:
                new_user.image_url = uploadImage(request.files['image_url'], new_user.name, new_user.role)
            if 'license' in request.files:
                new_user.license = uploadDocument(request.files['license'], new_user.name)
            
            db.session.add(new_user)
            db.session.commit()

            return make_response(jsonify({"message": "User created successfully"}), 201)

        except Exception as e:
            db.session.rollback()
            return make_response(jsonify({"error": str(e)}), 500)
    
class UserById(Resource):
    def patch(self, id):
        user = User.query.get(id)
        if not user:
            return make_response(jsonify({"error": "User not found"}), 404)

        data = request.get_json()
        

        # Update user fields if provided
        user.username = data.get('username', user.username)
        user.email = data.get('email', user.email)
        user.phone = data.get('phone', user.phone)
        user.role = data.get('role', user.role)
        user.is_active = str_to_bool(data.get('is_active', user.is_active))
        user.is_approved = str_to_bool(data.get('is_approved', user.is_approved))
        user.license = data.get('license', user.license)
        user.image_url = data.get('image_url', user.image_url)

        # You can handle password hashing here if needed
        if 'password' in data:
            user.password_hash = data['password']

        try:
            db.session.commit()
            return make_response(jsonify(user.to_dict()), 200)
        except Exception as e:
            db.session.rollback()
            return make_response(jsonify({"error": str(e)}), 500)

    def delete(self,id):
        user = User.query.get(id)
        if not user:
            return make_response(jsonify({"error": "User not found"}), 404)

        try:
            user.is_active = False
            db.session.commit()
            return make_response(jsonify({"message": "User deactivated successfully"}), 204)
        except Exception as e:
            db.session.rollback()
            return make_response(jsonify({"error": str(e)}), 500)
