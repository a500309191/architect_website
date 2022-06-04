export const getNotBooleanFilters = data => {

    let notBooleanFilterList = []
    let someHouse = data[0]

    for (let filter in someHouse) {
        let filterValue = someHouse[filter]
        if (typeof(filterValue) !== "boolean") {
            notBooleanFilterList.push(filter)
        }
    }

    return notBooleanFilterList
}