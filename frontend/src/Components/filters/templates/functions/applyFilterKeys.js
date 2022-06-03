export const applyFilterKeys = (dict, filterKeys) => {
    const obj = JSON.parse(dict)
    for (let i=0; i < Object.keys(obj).length; i++) {
        obj[filterKeys[i]] = obj[i+1]
        delete obj[i+1]
    }
    return JSON.stringify(obj)
}