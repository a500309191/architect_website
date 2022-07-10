def letterFrequencyDict(textExamplePath, deep=1000):
	#counting precision depends on DEEP value (the more value the more precision)

	#create english alphabet list
	alphabet = [chr(index) for index in range(97, 123)]

	#get text example for counting letter frequency (if example exists)
	if textExamplePath != '':
		import io
		f = io.open(textExamplePath, mode='r', encoding='utf-8')
		text = f.read().lower()
	#if example was not taken, return default histogram
	#where each letter has same frequency
	else:
		hist = {}
		for letter in alphabet:
			hist.setdefault(letter, 1)
		return hist


	#create an  alphabet histogram with the ABSOLUTE count of all letters
	hist = {}
	for char in text:
		if char in alphabet:
			hist[char] = hist.get(char, 0) + 1

	#get all letters number in text
	numberOfLetters = 0
	for letter in hist:
		numberOfLetters += hist[letter]

	#create an alphabet histogram with the RELATIVE count of all letters
	#magnitude of relative value depends on DEEP argument (the more... the more...)
	#if relative value is too low: value = 1
	for letter in hist:
		part = hist[letter] / numberOfLetters
		part *= deep
		if int(part) == 0: part = 1
		hist[letter] = int(part)

	return hist









