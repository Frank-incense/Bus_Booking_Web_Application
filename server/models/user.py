from server.config import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Column, Integer, String, DateTime, func, Boolean
from sqlalchemy.orm import relationship, validates
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy import Enum

ROLES = ('Admin', 'Driver')

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = Column(Integer(), primary_key=True)
    name = Column(String(), nullable=False)
    email = Column(String(), unique=True, nullable=False)
    _password_hash = Column(String(), nullable=False) 
    image_url = Column(String())
    license = Column(String())
    is_approved = Column(Boolean(), default=False)
    role = Column(Enum(*ROLES, name='user_roles'), nullable=False)
    created_at = Column(DateTime(), server_default=func.now())
    updated_at = Column(DateTime(), onupdate=func.now())

    serialize_rules = ()
    serialize_only = ()
    
    def __repr__(self):
        return f"User: {self.id}, {self.name}."
    
    @hybrid_property
    def password_hash(self):
        raise AttributeError('Cannot access this value')
    
    @password_hash.setter
    def password_hash(self, value):
        from server.app import bcrypt
        password_hash = bcrypt.generate_password_hash(value.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        from server.app import bcrypt
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
    
    @validates('role')
    def validate_role(self, key, value):
        if value is 'Driver' or value is 'Admin':
            return value
        
        raise ValueError('Role can only be Driver or Admin')
        