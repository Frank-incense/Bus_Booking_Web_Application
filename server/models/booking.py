from server.config import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Column, Integer, String, DateTime, func, Boolean, ForeignKey
from sqlalchemy.orm import relationship, validates

from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy import Enum

STATUS = ('Booked', 'Cancelled',)

class Booking(db.Model, SerializerMixin):
    __tablename__ = 'bookings'

    id = Column(Integer(), primary_key=True)
    trip_id = Column(Integer(), ForeignKey('trips.id'), nullable=False)
    customer_id = Column(Integer(), ForeignKey('customers.id'), nullable=False)
    seat = Column(Integer(), nullable=False)
    status = Column(Enum(*STATUS, name='booking_status'), default='Cancelled')
    created_at = Column(DateTime(), server_default=func.now())
    updated_at = Column(DateTime(), onupdate=func.now())

    customer = relationship('Customer', back_populates='bookings')
    trip = relationship('Trip', back_populates='bookings')

    serialize_rules = ('-customer.bookings', '-trip.bookings')

    def __repr__(self):
        return f"Booking: {self.id}, {self.seat}"