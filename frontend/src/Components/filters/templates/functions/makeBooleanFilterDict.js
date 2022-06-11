export const makeBooleanFilterDict = filterParamsList => {

    let BooleanFilterDict = {}

    filterParamsList.forEach(param => {
        BooleanFilterDict[param] = [true, true]
    })

    return BooleanFilterDict
}
