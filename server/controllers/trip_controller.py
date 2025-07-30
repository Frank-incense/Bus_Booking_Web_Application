from flask_jwt_extended import get_jwt_identity, create_access_token, jwt_required, set_access_cookies, unset_jwt_cookies
from flask import request, make_response, jsonify
from server.models import (User, Operator, Booking, Trip, 
                           Route, Bus, Booking, Comment)
from sqlalchemy import func
from server.config import db
from flask_restful import Resource


class Search(Resource):
    def get(self):
        # Get query params
        from_location = request.args.get('from')
        to_location = request.args.get('to')
        departure_date = request.args.get('departure_date')
        return_date = request.args.get('return_date')

        # Build the query dynamically
        query = Trip.query
        routes = Route.query.filter_by(origin=from_location, destination=to_location).all()
            
        if departure_date:
            query = query.filter_by(departure=departure_date)
        if return_date:
            query = query.filter_by(return_date=return_date)

        trips = query.all()
     
        result = []
        for route in routes:
            for trip in trips:
                if trip.route_id == route.id:
                    result.append({
                        'tripId': trip.id,
                        'from': route.origin,
                        'to': route.destination,
                        'date': trip.departure.date().isoformat(),
                        'arrival': trip.arrival.time().strftime('%H:%M'),
                        'departure': trip.departure.time().strftime('%H:%M'),
                        'cost': trip.cost,
                        'bookings': [booking.seat for booking in trip.bookings]
                    })


            
        if result:
            return make_response(result, 200)
        return make_response({'error': 'No matching trips found.'}, 404)

class Trips(Resource):
    def get(self):
        trips = Trip.query.all()
        if trips:
            return make_response([trip.to_dict() for trip in trips], 200)
        
        return make_response({'Error': 'Trips not found.'})

    def post(self):
        data = request.get_json()

        trip = Trip(
            bus_id = data.get('bus_id'),
            route_id = data.get('route_id'),
            departure = data.get('departure'),
            arrival = data.get('arrival'),
            cost = data.get('cost') 
        )

        db.session.add(trip)
        db.session.commit()

        return make_response(trip.to_dict(), 201)
class TripById(Resource):
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
    