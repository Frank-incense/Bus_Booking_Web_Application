from datetime import datetime, timedelta
from server.app import app, db
from server.models import User, Operator, Bus, Route, Trip, Customer, Booking, Comment  # Import your models
import random


# Clear tables
def clear_data():
    db.drop_all()
    db.create_all()

def seed():
    clear_data()

    # Seed date start
    base_date = datetime(2025, 7, 28)

    admin = User(name='Frankincense',
                email='frankincensewesley@gmail.com',
                role='Admin',
                is_approved=True,
                is_active=True)
    admin.password_hash = 'frank'

    db.session.add(admin)
    db.session.commit()


    print("Database seeded successfully.")

if __name__ == '__main__':
    with app.app_context():
        seed()
