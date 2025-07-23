from flask_jwt_extended import get_jwt_identity, create_access_token, jwt_required, set_access_cookies, unset_jwt_cookies
from flask import request, make_response, jsonify
from server.models import (User, Operator, Booking, Trip, 
                           Route, Bus, Booking, Comment)
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