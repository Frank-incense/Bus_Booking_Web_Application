from server.controllers.authentication import Register
from server.controllers.admin_controller import Approve, AdminSummary, BookingStats, PendingApprovals, Driver
from server.controllers.image_controller import Images
def addResource(api):
    api.add_resource(Register, '/api/signup')
    api.add_resource(Images, '/api/images')
    api.add_resource(Driver, '/api/drivers')
    api.add_resource(PendingApprovals, '/api/pending')
    api.add_resource(Approve, '/api/approved/<int:id>')
    api.add_resource(AdminSummary, '/api/summary')