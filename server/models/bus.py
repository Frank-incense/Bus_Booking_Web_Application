from server.config import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Column, Integer, String, DateTime, func, Boolean, ForeignKey
from sqlalchemy.orm import relationship, validates

from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy import Enum

STATUS = ('Active', 'Inactive',)

class Bus(db.Model, SerializerMixin):
    __tablename__ = 'buses'

    id = Column(Integer(), primary_key=True)
    registration = Column(String(), nullable=False)
    user_id = Column(Integer(), ForeignKey('users.id'))
    operator_id = Column(Integer(), ForeignKey())
    no_of_seats = Column(Integer(), nullable=False)
    image_url = Column(String())
    status = Column(Enum(*STATUS, name='bus_status'), nullable=False)
    created_at = Column(DateTime(), server_default=func.now())
    updated_at = Column(DateTime(), onupdate=func.now())

    def __repr__(self):
        return f"Bus, {self.id} {self.registration}"