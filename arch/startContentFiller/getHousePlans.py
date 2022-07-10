import os

def housePlans(directory):
	filesInFolder = os.listdir(directory)
	plansList = []
	
	for file_ in filesInFolder:
		ext = file_.split('.')[-1]
		fileName = file_.split('.')[0]
		imageExts = ['jpg', 'jpeg', 'bmp', 'png']
		if ext in imageExts and not fileName.isdigit(): plansList.append(file_)
		
	return plansList
