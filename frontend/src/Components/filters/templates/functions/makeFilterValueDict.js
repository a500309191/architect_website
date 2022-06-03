export const makeFilterValueDict = filterParamsList => {

    let FilterValueDict = {}

    filterParamsList.forEach(param => {
        FilterValueDict[param] = true
    })

    return FilterValueDict
}
