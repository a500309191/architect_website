export const sortArray = (array, value, sortingDirection) => {

    let sortMaxToMin = [...array].sort((a, b) => b[value] - a[value])
    let sortMinToMax = [...array].sort((a, b) => a[value] - b[value])

    if (sortingDirection) {
        return sortMaxToMin
    } else {
        return sortMinToMax
    }
}


//export const sortArray = (array, value, sortingDirection) => {
//
//    sortingDirection
//    ? [...array].sort((a, b) => b[value] - a[value])
//    : [...array].sort((a, b) => a[value] - b[value])
//
//}