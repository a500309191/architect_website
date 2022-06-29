export const shuffleArray = array => {

    let shuffleArray = [...array]

    for (let i = shuffleArray.length - 1; i >= 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i+1))
        let itemAtIndex = shuffleArray[randomIndex]

        shuffleArray[randomIndex] = shuffleArray[i]
        shuffleArray[i] = itemAtIndex
    }
    return shuffleArray
}
