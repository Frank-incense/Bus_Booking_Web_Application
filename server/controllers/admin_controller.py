from flask_jwt_extended import get_jwt_identity, create_access_token, jwt_required, set_access_cookies, unset_jwt_cookies
from flask import request, make_response, jsonify
from server.models import (User, Operator, Booking, Trip, 
                           Route, Bus, Booking, Comment)
from sqlalchemy import func
from server.config import db
from flask_restful import Resource

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
    
    def patch(self, id):
        data = request.get_json()
        user = User.query.filter_by(id=id).first()

        if user:
            for attr in data:
                setattr(user, attr, data[attr])
            
            db.session.add(user)
            db.session.commit()

            return make_response(user.to_dict(), 201)
        
        return make_response({
            'Error': 'User does not exist.'
        }, 400)

class PendingApprovals(Resource):
    def get(self):
        users = User.query.filter_by(is_approved=False, role='Driver').all()
        
        if users:
            return make_response([user.to_dict() for user in users], 200)
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
            return make_response([user.to_dict() for user in users], 200)
        return make_response({
            'Error': 'No drivers found.'
        }, 400)
    
