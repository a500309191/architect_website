export const getBooleanFilters = data => {

    let booleanFilterList = []
    let someHouse = data[0]

    for (let filter in someHouse) {
        let filterValue = someHouse[filter]
        if (typeof(filterValue) == "boolean") {
            booleanFilterList.push(filter)
        }
    }

    return booleanFilterList
}