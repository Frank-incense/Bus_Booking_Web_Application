from server.config import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Column, Integer, String, DateTime, func, Boolean, ForeignKey
from sqlalchemy.orm import relationship, validates

from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy import Enum


class Operator(db.Model, SerializerMixin):
    __tablename__ = 'operators'

    id = Column(Integer(), primary_key=True)
    operator = Column(String(), nullable=False)
    image_url = Column(String())
    created_at = Column(DateTime(), server_default=func.now())
    updated_at = Column(DateTime(), onupdate=func.now())

    comments = relationship('Comment', back_populates='operator')
    buses = relationship('Bus', back_populates='operator')

    serialize_rules = ('-comments.operator','-buses.operator',)
    
    def __repr__(self):
        return f"Operator, {self.id} {self.operator}"