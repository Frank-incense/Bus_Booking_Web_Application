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
    email = Column(String(), unique=True)
    phone = Column(String(), unique=True)
    _password_hash = Column(String() ) 
    image_url = Column(String())
    license = Column(String())
    is_approved = Column(Boolean(), default=False)
    is_active = Column(Boolean(), default=False)
    role = Column(Enum(*ROLES, name='user_roles'))
    created_at = Column(DateTime(), server_default=func.now())
    updated_at = Column(DateTime(), onupdate=func.now())

    buses = relationship('Bus', back_populates='user')
    
    serialize_rules = ('-buses.user',)
    serialize_only = (
        'id', 
        'name', 
        'email',
        'phone',
        'image_url', 
        'is_approved',
        'is_active',
        'role',
        'created_at',
        'updated_at',)
    
    def __repr__(self):
        return f"<User {self.id}: {self.name}>"

    @hybrid_property
    def password_hash(self):
        raise AttributeError("Password hash is write-only.")

    @password_hash.setter
    def password_hash(self, value):
        from server.app import bcrypt
        hashed = bcrypt.generate_password_hash(value.encode('utf-8'))
        self._password_hash = hashed.decode('utf-8')

    def authenticate(self, password):
        from server.app import bcrypt
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

    @validates('role')
    def validate_role(self, key, value):
        allowed_roles = ['Driver', 'Admin']
        if value not in allowed_roles:
            raise ValueError(f"Role must be one of {allowed_roles}")
        return value
