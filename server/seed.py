from datetime import datetime, timedelta
from app import db  # Your SQLAlchemy db instance
from models import User, Operator, Bus, Route, Trip, Customer, Booking, Comment  # Import your models
import random

# Clear tables
def clear_data():
    db.drop_all()
    db.create_all()

def seed():
    clear_data()

    # Seed date start
    base_date = datetime(2025, 7, 28)

    # Operators
    operators = [
        Operator(operator="Dreamline", image_url="https://example.com/dreamline.png"),
        Operator(operator="Mash Poa", image_url="https://example.com/mashpoa.png")
    ]
    db.session.add_all(operators)
    db.session.commit()

    # Users (Drivers)
    drivers = [
        User(name="James Kariuki", email="james@example.com", phone="0712345678",
             _password_hash="hashedpassword", role="Driver", is_approved=True, is_active=True,
             license="https://res.cloudinary.com/demo/license1.png"),
        User(name="Alice Wanjiku", email="alice@example.com", phone="0723456789",
             _password_hash="hashedpassword", role="Driver", is_approved=True, is_active=True,
             license="https://res.cloudinary.com/demo/license2.png")
    ]
    db.session.add_all(drivers)
    db.session.commit()

    # Buses
    buses = [
        Bus(registration="KDH123A", no_of_seats=45, status="Active", operator_id=operators[0].id, user_id=drivers[0].id),
        Bus(registration="KCL456B", no_of_seats=33, status="Inactive", operator_id=operators[1].id, user_id=drivers[1].id)
    ]
    db.session.add_all(buses)
    db.session.commit()

    # Routes
    routes = [
        Route(name="Nairobi - Mombasa", origin="Nairobi", destination="Mombasa", distance=480),
        Route(name="Nairobi - Kisumu", origin="Nairobi", destination="Kisumu", distance=350)
    ]
    db.session.add_all(routes)
    db.session.commit()

    # Trips
    trips = []
    for i in range(2):
        trips.append(
            Trip(
                bus_id=buses[i].id,
                route_id=routes[i].id,
                departure=base_date + timedelta(hours=i * 5),
                arrival=base_date + timedelta(hours=i * 10),
                cost=random.uniform(800, 1500)
            )
        )
    db.session.add_all(trips)
    db.session.commit()

    # Customers
    customers = [
        Customer(first_name="Brian", second_name="Otieno", email="brian@example.com",
                 phone="0700112233", identification="12345678", nationality="Kenyan"),
        Customer(first_name="Faith", second_name="Mutua", email="faith@example.com",
                 phone="0798765432", identification="87654321", nationality="Kenyan")
    ]
    db.session.add_all(customers)
    db.session.commit()

    # Bookings
    bookings = [
        Booking(trip_id=trips[0].id, customer_id=customers[0].id, seat=5, status="Booked"),
        Booking(trip_id=trips[1].id, customer_id=customers[1].id, seat=12, status="Cancelled")
    ]
    db.session.add_all(bookings)
    db.session.commit()

    # Comments
    comments = [
        Comment(comment="Very smooth ride!", rating=4, customer_id=customers[0].id, operator_id=operators[0].id),
        Comment(comment="Could be cleaner.", rating=3, customer_id=customers[1].id, operator_id=operators[1].id)
    ]
    db.session.add_all(comments)
    db.session.commit()

    print("Database seeded successfully.")

if __name__ == '__main__':
    seed()
