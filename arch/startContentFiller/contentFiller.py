import os
from . getHouseInfo import houseInfo
from . createImages import createImages
from . createPlans import createPlans
from . houseNamesGenerator.randomNameGenerator import createRandomNames
from arch.models import Material, Style, Roof, House

firstTablesValues = {
	'material': ['stone', 'wood'],
	'style': ['traditional', 'contemporary'],
	'roof': ['pitched', 'flat', 'combined'],
}

def fillFirstTables(tables):
	def getModel(table):
		model = ''
		if table == 'material': model = Material
		if table == 'style': model = Style
		if table == 'roof': model = Roof
		return model

	values = {}
	for table in tables:
		names = tables[table]
		for name in names:
			createRow = getModel(table).objects.get_or_create(name=name)
			newRow = createRow[0]
			values.setdefault(name, newRow.id)

	return values

foreignKeysValues = fillFirstTables(firstTablesValues)


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

def createHouses(directory, foreignKeysValues=foreignKeysValues):

	housesDirs = getHousesDirs(directory)

	housesNumber = len(housesDirs)
	exampleTextPath = 'arch/startContentFiller/houseNamesGenerator/example.txt'
	randomNames = createRandomNames(housesNumber, exampleTextPath)
	index = 0

	for houseDir in housesDirs:
		houseInfoDict = houseInfo(houseDir, foreignKeysValues)
		houseInfoDict['model_name'] = randomNames[index]
		index += 1

		house = House(**houseInfoDict)
		house.save()

	#bulkcreate method but without random name for each house
	# housesInfos = [HousePage(**houseInfo(houseDir, foreignKeysValues)) for houseDir in housesDirs]
	# HousePage.objects.bulk_create(housesInfoqs)

	houses = House.objects.all()
	lastId = houses[len(houses) - 1].id
	firstHouseId = lastId - len(housesDirs)

	createImages(housesDirs, firstHouseId)
	createPlans(housesDirs, firstHouseId)


# to django shell
# from arch.startContentFiller.contentFiller import *
# createHouses(dir)







	



	
	
	
	
	

	
	
	
	
	
	
	
