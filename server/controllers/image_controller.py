from flask_restful import Resource
import cloudinary.uploader
from cloudinary.utils import cloudinary_url
def uploadImage(image, id, folder):

    # Set the asset's public ID and allow overwriting the asset with new versions
    cloudinary.uploader.upload( image, 
                               public_id=id, 
                               folder=folder )

    # Build the URL for the image and save it in the variable 'srcURL'
    srcURL = cloudinary_url(f'drivers/{id}', type='upload', secure=True )

    print("****2. Upload an image****\nDelivery URL: ", srcURL, "\n")    

    return srcURL[0]

def uploadDocument(document, id):

    # Set the asset's public ID and allow overwriting the asset with new versions
    result = cloudinary.uploader.upload( document, 
                               resource_type='raw', 
                               public_id=id, 
                               folder='drivers/license' )
    # Build the URL for the image and save it in the variable 'srcURL'
    srcURL = cloudinary_url( f'drivers/license/{id}', 
                              resource_type='raw', 
                              type='upload', 
                              secure=True )

    print("****2. Upload an image****\nDelivery URL: ", srcURL, "\n")    

    return srcURL[0]

class Images(Resource):
    def get(self):
        images = cloudinary.Search().expression('folder:"static"').execute()
        shots = cloudinary.Search().expression('folder:"headshots"').execute()
        pics = [{
            'name': img['filename'],
            'image_url': img['secure_url']
        } for img in images['resources']]
        return {'static':pics, 'headshots':[{'name':img['filename'],'image_url':img['secure_url']} for img in shots['resources']]}
