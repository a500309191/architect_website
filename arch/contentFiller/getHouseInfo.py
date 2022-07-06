from datetime import datetime

def isFloat(a):
	if a.isdigit():
		return False
	else:
		try:
			return float(a)
		except:
			return False
			

def houseInfo(directory, foreignKeysValues):
	infoFile = open(directory + '\info.txt')
	
	d = {}
	for line in infoFile:
		column = line.split(": ")[0].strip()
		value = line.split(": ")[1].strip()
		d.setdefault(column, value)

	for key in d:
		value = d[key]

		if isFloat(value):
			value = float(value)
		else:
			#convert boolean values
			if value.isalpha() and value.lower() == 'true': value = True
			elif value.isalpha() and value.lower() == 'false': value = False
			#convert foreign key values to id
			elif value in [key for key in foreignKeysValues]: value = foreignKeysValues[value]
			elif value.isdigit(): value = int(value)

		d[key] = value
	
	if 'model_name' not in d: d.setdefault('model_name', 'test')
	d.setdefault('time_create', datetime.now())
	d.setdefault('time_update', datetime.now())
	
	return d
