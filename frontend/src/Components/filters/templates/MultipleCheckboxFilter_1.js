import React, { useState, useEffect } from "react";
import { getNotBooleanFilters } from "./functions/getNotBooleanFilters";
import { getFilterParams } from "./functions/getFilterParams";
import { makeFilterList } from "./functions/makeFilterList";

export const MultipleCheckboxFilter = ({
        data,
        filterType,
        onChange,
        checkboxStyle,
        textStyle,
        countStyle,
    }) => {

    const notBooleanFilterList = getNotBooleanFilters(data)
    console.log(notBooleanFilterList)
    const [filterParamsCountDict, filterParamsList] = getFilterParams({filterType, data})
    const filterList = makeFilterList(filterParamsList)

    const [filter, setFilter] = useState(filterList)

    useEffect(() => {
        onChange(JSON.stringify(filter))
    }, [filter])

    return (
        <>
            <div>{filterType.toUpperCase()} FILTER</div>
            <div>
                {filterList.map((_, index) => {
                    let param = filterParamsList[index]
                    let count = filterParamsCountDict[param]
                    return (
                        <div key={index} style={checkboxStyle}>
                            <input
                                type="checkbox"
                                defaultChecked
                                onChange = {() => {
                                    setFilter(filterList => {
                                        filterList[index][param] = !filterList[index][param]
                                        return [...filterList]
                                    })}}
                            />
                            <label style={textStyle}>{param}</label>
                            <label style={countStyle}>[{count}]</label>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

