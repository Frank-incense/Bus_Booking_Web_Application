from server.config import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Column, Integer, String, DateTime, func, Boolean, ForeignKey
from sqlalchemy.orm import relationship, validates

from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy import Enum

class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'

    id = Column(Integer(), primary_key=True)
    comment = Column(String(300), nullable=False)
    rating = Column(Integer(), nullable=False)
    customer_id = Column(Integer(), ForeignKey('customers.id'))
    operator_id = Column(Integer(), ForeignKey('operators.id'))
    created_at = Column(DateTime(), server_default=func.now())
    updated_at = Column(DateTime(), onupdate=func.now())

    customer = relationship('Customer', back_populates='comments')
    operator = relationship('Operator', back_populates='comments')

    serialize_rules = ('-customer.comments', '-operator.comments')
    
    def __repr__(self):
        return f"Comment: {self.id}, {self.comment}"
    