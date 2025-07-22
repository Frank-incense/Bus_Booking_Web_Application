from server.config import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Column, Integer, String, DateTime, func, Boolean, ForeignKey
from sqlalchemy.orm import relationship, validates

from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy import Enum

class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'

    id = Column(Integer(), primary_key=True)
    first_name = Column(String(), nullable=False)
    second_name = Column(String(), nullable=False)
    email = Column(String(), nullable=False)
    phone = Column(String(), nullable=False)
    identification = Column(String(), nullable=False)
    nationality = Column(String(), nullable=False)
    created_at = Column(DateTime(), server_default=func.now())
    updated_at = Column(DateTime(), onupdate=func.now())

    def __repr__(self):
        return f"Customer {self.id}, {self.first_name}"