from server.controllers.authentication import Register
from server.controllers.admin_controller import Approve, AdminSummary, BookingStats, PendingApprovals, Driver, Users, UserById
from server.controllers.image_controller import Images
from server.controllers.booking_controller import Bookings
from server.controllers.bus_controller import Routes, Buses
from server.controllers.trip_controller import Trips, TripById

def addResource(api):
    api.add_resource(Register, '/api/signup')
    api.add_resource(Images, '/api/images')
    api.add_resource(Driver, '/api/drivers')
    api.add_resource(PendingApprovals, '/api/pending')
    api.add_resource(Approve, '/api/approved/<int:id>')
    api.add_resource(AdminSummary, '/api/summary')
    api.add_resource(Bookings, '/api/bookings')
    api.add_resource(Routes, '/api/routes')
    api.add_resource(Buses, '/api/buses')
    api.add_resource(Trips, '/api/trips')
    api.add_resource(TripById, '/api/trips/<int:id>')
    api.add_resource(Users, '/api/users')
    api.add_resource(UserById, '/api/users/<int:id>')
