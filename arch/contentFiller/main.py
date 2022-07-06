import os
from datetime import datetime
from . getHouseImages import houseImages
from . getHousePlans import housePlans
from . getHouseInfo import houseInfo
from arch.models import *

#x = House(model_name='test', area=1000, floors=2, entrance=2, bedroom=4, bathroom=3, kitchen_living_room=True, tech_room=True, terrace=True, time_create=datetime.now(), time_update=datetime.now(), material_id=1, style_id=1, roof_id='flat')

def getForeignKeysValues():
    Roofs = Roof.objects.all()
    Styles = Style.objects.all()
    Materials = Material.objects.all()

    foreignKeyTables = [Roofs, Styles, Materials]
    foreignKeysValues = {}

    for table in foreignKeyTables:
        for row in table:
            foreignKeysValues.setdefault(str(row), int(row.id))

    return foreignKeysValues

foreignKeysValues = {
	'stone': 1,
	'wood': 2,
	'pitched': 1,
	'flat': 2,
	'traditional': 1,
	'contemporary': 2,
}


def getHousesDirs(directory):
	foldersInDir = os.listdir(directory)
	housesFolders = []
	for folder in foldersInDir:
		partsName = folder.split('_')
		if partsName[0] == 'house' and partsName[1].isdigit():
			housesFolders.append(folder)
			housesFolders.sort(key = lambda folder: int(folder.split("_")[1]))
	
	
	d = []
	for folder in housesFolders:
		houseDir = os.path.join(directory, folder)
		if os.path.isdir(houseDir) and os.listdir(houseDir) != []:
			d.append(houseDir)
		
	return d

directory = 'C:\P\PROJECTS\ARCHITECT_WEBSITE\houses'
housesDirs = getHousesDirs(directory)

def getLastId():
	houses = House.objects.all()
	if houses == []:
		last_id = 0
	else:
		last_id = len(houses)

	return last_id
lastId = getLastId()


def createHouses(housesDirs, foreignKeysValues):
	bulkInfos = [House(**houseInfo(houseDir, foreignKeysValues)) for houseDir in housesDirs]
	House.objects.bulk_create(bulkInfos)

# def createImages(housesDirs):
# 	from django.core.files import File
#
# 	houses = House.objects.all()
# 	lastId = houses[len(houses) - 1].id
# 	house_id = lastId - len(housesDirs)
#
# 	bulkImages = []
# 	for houseDir in housesDirs:
# 		images = houseImages(houseDir)
# 		house_id += 1
# 		for image in images:
# 			d = {}
# 			imageDir = '{}\{}'.format(houseDir, image)
# 			imageFile = File(open(imageDir, 'rb'))
#
# 			d.setdefault('image', imageFile)
# 			d.setdefault('image_thumbnail', '')
# 			d.setdefault('time_update', datetime.now())
# 			d.setdefault('house_id', house_id)
#
# 			bulkImage = Image(**d)
# 			bulkImage.attachment = imageFile
# 			# imageFile.close()
#
# 			bulkImages.append(bulkImage)
#
# 	Image.objects.bulk_create(bulkImages)

def createImages(housesDirs):
	from django.core.files import File

	houses = House.objects.all()
	lastId = houses[len(houses)-1].id
	house_id = lastId - len(housesDirs)

	for houseDir in housesDirs:
		images = houseImages(houseDir)
		house_id += 1
		for image in images:
			d = {}
			imageDir = '{}\{}'.format(houseDir, image)
			imageFile = File(open(imageDir, 'rb'))

			d.setdefault('image', imageFile)
			d.setdefault('image_thumbnail', '')
			d.setdefault('time_update', datetime.now())
			d.setdefault('house_id', house_id)

			image = Image(**d)
			image.attachment = imageFile
			image.save()
			imageFile.close()



def createPlans(housesDirs):
	houses = House.objects.all()
	lastId = houses[len(houses)-1].id
	house_id = lastId - len(housesDirs)

	bulkPlans = []
	for houseDir in housesDirs:
		plans = housePlans(houseDir)
		house_id += 1
		for plan in plans:
			d = {}
			d.setdefault('plan', '{}\{}'.format(houseDir, plan))
			d.setdefault('time_update', datetime.now())
			d.setdefault('house_id', house_id)
			bulkPlans.append(Plan(**d))

	Plan.objects.bulk_create(bulkPlans)






	



	
	
	
	
	

	
	
	
	
	
	
	
