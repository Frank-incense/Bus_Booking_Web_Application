from flask_jwt_extended import get_jwt_identity, create_access_token, jwt_required, set_access_cookies, unset_jwt_cookies
from flask import request, make_response, jsonify
from server.models import ( Bus, Route, User, Operator )
from server.controllers.image_controller import uploadImage
from sqlalchemy import func
from server.config import db
from flask_restful import Resource

class Buses(Resource):
    def get(self):
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 7, type=int)
        driver_id = request.args.get('driver_id', type=int)

        # Conditional filtering
        query = Bus.query
        if driver_id:
            query = query.filter_by(driver_id=driver_id)

        # Pagination
        pagination = query.paginate(page=page, per_page=per_page, error_out=False)
        buses = pagination.items

        if buses:
            return make_response(jsonify({
                'data': [bus.to_dict() for bus in buses],
                'total': pagination.total,
                'page': pagination.page,
                'per_page': pagination.per_page,
                'pages': pagination.pages
            }), 200)

        return make_response(jsonify({'error': 'No buses found'}), 404)


    def post(self):
        data = request.form
        image_file = request.files.get('busImage')

        if Bus.query.filter_by(registration = data.get('registration')).first():
            return make_response({'Error': 'Bus already exists'})
        
        user = User.query.filter_by(name=data.get('driver')).first()
        
        bus = Bus(
            user_id = user.id,
            registration = data.get('bus'),
            no_of_seats = data.get('seats'),
            status = 'Active'
        )

        if image_file:
            bus.image_url = uploadImage(image_file, data.get('registration'), 'buses')

        db.session.add(bus)
        db.session.commit()

        return make_response(bus.to_dict(), 201)
    
class BusById(Resource):
    def patch(self):
        data = request.form
        image_file = request.files.get('busImage')

        bus = Bus.query.filter_by(registration=data.get('registration')).first()
        user = User.query.filter_by(name=data.get('driver')).first()

        if image_file:
            bus.image_url = uploadImage(image_file, data.get('registration'), 'buses')

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