export const getFilterParams = ({filterType, data}) => {

    let paramsCountDict = {}
    let paramsList = []
    let excessParamsList = []

    for (let i=0; i < data.length; i++) {
        let house = data[i]
        let filterKey = house[filterType]
        excessParamsList.push(filterKey)
    }

    excessParamsList.forEach(key => {
        paramsCountDict[key] = (paramsCountDict[key] || 0) + 1
    })

    for (let param in paramsCountDict) {
        if (Number(param)) { paramsList.push(Number(param)) }
        else paramsList.push(param)
    }

    return [paramsCountDict, paramsList]
}

