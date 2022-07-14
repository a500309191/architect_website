export const checkboxFilter = (house, checkboxType, filterList) => {
    let checkingList = []
    for (let i=0; i<filterList.length; i++) {
        let filter = filterList[i]
        let values = checkboxType[filter]
        let value = house[filter]
        checkingList.push(values && values.includes(value))
    }
    if (checkingList.includes(false)) { return false }
    else { return true }
}