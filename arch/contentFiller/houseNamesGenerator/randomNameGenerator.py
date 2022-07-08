import random
from . getLetterFrequencyDict import letterFrequencyDict


def createRandomNames(namesNumber, textExamplePath='', deep=1000):
	#about deep argument read in the letterFrequencyDict func
	#define english vowels
	vowelsList = ['a','e','i','o','u','y']
	
	#get letters frequency by dict histogram
	letters = letterFrequencyDict(textExamplePath, deep)
	
	#make lists with lettes number by its frequency
	vowels = []
	consonants = []
	for letter in letters:
		number = letters[letter]
		if letter in vowelsList:
			for i in range(number):
				vowels.append(letter)
		else:
			for i in range(number):
				consonants.append(letter)

	#define two lettersTypes (vowels & consonants) in list
	letterTypes = [vowels, consonants]

	#create random names
	randomNames = []
	for i in range(namesNumber):
		word = ''
		wordLen = random.randint(4, 8)
		count = 0
		check = ''
		for i in range(wordLen):
			
			# 0 or 1 because of there letter could be just vowel or consonant
			letterTypeIndex = random.randint(0, 1)
			
			if letterTypeIndex == check:
				count += 1
			if count > 1:
				letterTypeIndex = abs(letterTypeIndex - 1)
				count = 0
			
			letterType = letterTypes[letterTypeIndex]
			check = letterTypeIndex
			
			lastLetterIndex = len(letterType)-1
			lettetIndex = random.randint(0, lastLetterIndex)
			letter = letterType[lettetIndex]
			
			word += letter
			
		randomNames.append(word)

	return randomNames



