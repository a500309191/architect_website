import os
from . getHouseInfo import houseInfo
from . createImages import createImages
from . createPlans import createPlans
from . houseNamesGenerator.randomNameGenerator import createRandomNames
from arch.models import Material, Style, Roof, House


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


def createHouses(housesDirs=housesDirs, foreignKeysValues=foreignKeysValues):

	housesNumber = len(housesDirs)
	exampleTextPath = 'arch/contentFiller/houseNamesGenerator/example.txt'
	randomNames = createRandomNames(housesNumber, exampleTextPath)
	index = 0

	for houseDir in housesDirs:
		houseInfoDict = houseInfo(houseDir, foreignKeysValues)
		houseInfoDict['model_name'] = randomNames[index]
		index += 1

		house = House(**houseInfoDict)
		house.save()

	#bulkcreate method but without random name for each house
	# housesInfos = [House(**houseInfo(houseDir, foreignKeysValues)) for houseDir in housesDirs]
	# House.objects.bulk_create(housesInfoqs)

	houses = House.objects.all()
	lastId = houses[len(houses) - 1].id
	firstHouseId = lastId - len(housesDirs)

	createImages(housesDirs, firstHouseId)
	createPlans(housesDirs, firstHouseId)


# from arch.contentFiller.main import *







	



	
	
	
	
	

	
	
	
	
	
	
	
