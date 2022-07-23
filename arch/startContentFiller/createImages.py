from django.core.files import File
from datetime import datetime
from . getHouseImages import houseImages
from arch.models import Image


def createImages(housesDirs, firstHouseId):
	id = firstHouseId
	for houseDir in housesDirs:
		images = houseImages(houseDir)
		id += 1
		for image in images:
			d = {}
			imageDir = '{}\{}'.format(houseDir, image)
			imageFile = File(open(imageDir, 'rb'))

			d.setdefault('original', imageFile)
			d.setdefault('thumbnail', '')
			d.setdefault('time_update', datetime.now())
			d.setdefault('house_id', id)

			image = Image(**d)
			image.attachment = imageFile
			image.save()
			imageFile.close()