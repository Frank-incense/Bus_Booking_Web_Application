from flask_jwt_extended import get_jwt_identity, create_access_token, jwt_required, set_access_cookies, unset_jwt_cookies
from flask import request, make_response, jsonify
from server.models import ( Bus, Route )
from sqlalchemy import func
from server.config import db
from flask_restful import Resource

class AddBus(Resource):
    def post(self):
        data = request.form

        if Bus.query.filter_by(registration = data.get('registration')).first():
            return make_response({'Error': 'Bus already exists'})

        bus = Bus(
            registration = data.get('registration'),
            no_of_seats = data.get('seats'),
            status = 'Active'
        )

        db.session.add(bus)
        db.session.commit()

        return make_response(bus.to_dict(), 201)
    
    def patch(self):
        data = request.form

        bus = Bus.query.filter_by(registration=data.get('registration')).first()

        if bus:
            for attr in data:
                setattr(bus, attr, data[attr])

            db.session.add(bus)
            db.session.commit()

            return make_response(bus.to_dict(), 201)
        
        return make_response({'Error': 'Bus not found.'}, 404)
    
    def delete(self, id):
        bus = Bus.query.filter_by(id=id).first()
        bus.status = 'Inactive'

        db.session.add(bus)
        db.session.commit()

        return make_response({}, 204)

class Routes(Resource):
    def get(self):
        routes = Route.query.all()

        if routes:
            return make_response([route.to_dict() for route in routes], 200) 

        return make_response({'error': 'No routes found'}, 404)

    def post(self):
        data = request.get_json()

        route = Route(
            name = data.get('name'),
            origin = data.get('origin'),
            destination = data.get('destination'),
            distance = data.get('distance')
        )

        db.session.add(route)
        db.session.commit()

        return make_response(route.to_dict(), 201)
    
    class RouteById(Resource):
        def patch(self, id):
            pass