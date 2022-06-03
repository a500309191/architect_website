export const getFilterParams = ({filterType, data}) => {

    let paramsDict = {}
    let paramsList = []
    let excessParamsList = []

    for (let i=0; i < data.length; i++) {
        let house = data[i]
        let filterKey = house[filterType]
        excessParamsList.push(filterKey)
    }

    excessParamsList.forEach(key => {
        paramsDict[key] = (paramsDict[key] || 0) + 1
    })

    for (let param in paramsDict) {
        paramsList.push(param)
    }

    return [paramsDict, paramsList]
}

