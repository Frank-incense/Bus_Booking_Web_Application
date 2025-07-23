from flask_jwt_extended import get_jwt_identity, create_access_token, jwt_required, set_access_cookies, unset_jwt_cookies
from flask import request, make_response, jsonify
from server.models import (User, Operator, Booking, Trip, 
                           Route, Bus, Booking, Comment)
from sqlalchemy import func
from server.config import db
from flask_restful import Resource

class Trips(Resource):
    def get(self):
        trips = Trip.query.all()
        if trips:
            return make_response([trip.to_dict() for trip in trips], 200)
        
        return make_response({'Error': 'Trips not found.'})

    def post(self):
        data = request.get_json()

        trip = Trip(
            bus_id = Bus.query.filter_by(registration=data.get('registration')).first(),
            route_id = data.get('id'),
            departure = data.get('departure'),
            arrival = data.get('arrival'),
            cost = data.get('cost') 
        )

        db.session.add(trip)
        db.session.commit()

        return make_response(trip.to_dict(), 201)
    
    def patch(self, id):
        data = request.get_json()
        trip = Trip.query.filter_by(id=id).first()

        if trip:
            for attr in data:
                setattr(trip, attr, data[attr])

            db.session.add(trip)
            db.session.commit()

            return make_response(trip.to_dict(), 201)
        
        return make_response({'Error': 'Trip not found.'}, 404)
    