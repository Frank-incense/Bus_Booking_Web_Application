from server.controllers.authentication import Register
from server.controllers.admin_controller import AdminSummary, BookingStats, PendingApprovals, Driver
from server.controllers.image_controller import Images
def addResource(api):
    api.add_resource(Register, '/api/signup')
    api.add_resource(Images, '/api/images')