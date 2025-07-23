from server.controllers.authentication import Register
from server.controllers.admin_controller import AdminSummary, BookingStats, PendingApprovals, Driver

def addResource(api):
    api.add_resource(Register, '/api/signup')