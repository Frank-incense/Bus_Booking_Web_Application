from server.config import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Column, Integer, String, DateTime, func, Boolean, ForeignKey
from sqlalchemy.orm import relationship, validates

from sqlalchemy.ext.hybrid import hybrid_property

class Route(db.Model, SerializerMixin):
    __tablename__ = 'routes'

    id = Column(Integer(), primary_key=True)
    origin = Column(String(), nullable=False)
    destination = Column(String(), nullable=False)
    distance = Column(Integer())
    created_at = Column(DateTime(), server_default=func.now())
    updated_at = Column(DateTime(), onupdate=func.now())

    trips = relationship('Trip', back_populates='route')

    serialize_rules = ('-trips.route',)

    def __repr__(self):
        return f"Booking: {self.id}, {self.origin} to {self.destination}"