export const makeFilterList = filterParamsList => {

    let l = []

    filterParamsList.forEach(param => {
        l.push({[`${param}`] : true})
    })

    return l
}
