from server.config import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Column, Integer, Float, DateTime, func, Boolean, ForeignKey
from sqlalchemy.orm import relationship, validates

from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy import Enum


class Trip(db.Model, SerializerMixin):
    __tablename__ = 'trips'

    id = Column(Integer(), primary_key=True)
    bus_id = Column(Integer(), ForeignKey('buses.id'))
    route_id = Column(Integer(), ForeignKey('routes.id'))
    departure = Column(DateTime(), nullable=False)
    arrival = Column(DateTime(), nullable=False)
    cost = Column(Float(), nullable=False)
    created_at = Column(DateTime(), server_default=func.now())
    updated_at = Column(DateTime(), onupdate=func.now())

    route = relationship('Route', back_populates='trips')
    bus = relationship('Bus', back_populates='trips')
    bookings = relationship('Booking', back_populates='trip')
    
    serialize_rules = ('-route.trips', '-bus.trips', '-bookings.trip',)

    def __repr__(self):
        return f"Trip: {self.id}, {self.departure} to {self.arrival}"