from flask_jwt_extended import get_jwt_identity, create_access_token, jwt_required, set_access_cookies, unset_jwt_cookies
from flask import request, make_response, jsonify
from server.models import (User, Operator, Booking, Trip, 
                           Route, Bus, Booking, Comment, Customer)
from sqlalchemy import func
from server.config import db
from flask_restful import Resource

class Bookings(Resource):
    def get(self):
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)

        # Query and paginate
        pagination = Booking.query.paginate(page=page, per_page=per_page, error_out=False)
        bookings = pagination.items

        if bookings:
            return make_response(jsonify({
                'data': [booking.to_dict() for booking in bookings],
                'total': pagination.total,
                'page': pagination.page,
                'per_page': pagination.per_page,
                'pages': pagination.pages
            }), 200)
        return make_response(jsonify({'error': 'No bookings found'}))

    def post(self):
        data = request.get_json()
        customer = Customer(
            first_name = data.get('firstName'),
            second_name = data.get('secondName'),
            email =data.get('email'),
            phone = data.get('phone'),
            identification = data.get('identification'),
            nationality = data.get('nationality')
        )

        db.session.add(customer)
        db.session.commit()

        booking = Booking(
            trip_id = data.get('trip_id'),
            customer_id = customer.id,
            seat = data.get('seat')
        )

        db.session.add(booking)
        db.session.commit()

        booking_data = {
            'id': booking.id,
            'bus': booking.trip.bus_id,
            'departure': booking.trip.departure,
            'arrival': booking.trip.arrival,
            'status': booking.status
        }

        return make_response(booking_data, 201)
