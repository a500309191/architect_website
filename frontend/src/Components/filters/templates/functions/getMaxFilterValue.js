export const getMaxFilterValue = ({filterType, data}) => {

    let valueList = []

    for (let i=0; i < data.length; i++) {
        let house = data[i]
        let filterTypeValue = house[filterType]
        valueList.push(filterTypeValue)
    }

    return Math.max(...valueList)
}