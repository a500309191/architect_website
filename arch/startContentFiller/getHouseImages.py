import os

def houseImages(directory):
	filesInFolder = os.listdir(directory)
	imagesList = []
	
	for file_ in filesInFolder:
		ext = file_.split('.')[-1]
		fileName = file_.split('.')[0]
		imageExts = ['jpg', 'jpeg', 'bmp', 'png']
		if ext in imageExts and fileName.isdigit(): imagesList.append(file_)
		
	return imagesList
