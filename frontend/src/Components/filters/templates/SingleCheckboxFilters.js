import React, { useState, useEffect } from "react";
import { getBooleanFilters } from "./functions/getBooleanFilters";
import { makeFilterList } from "./functions/makeFilterList";

export const SingleCheckboxFilters = ({
        data,
        checkboxStyle,
        onChange,
        header,
        textStyle,
        countStyle,
        filterStyle,
    }) => {

    const booleanFilterList = getBooleanFilters(data)
    const filterList = makeFilterList(booleanFilterList)

    const [filter, setFilter] = useState(filterList)

    useEffect(() => {
        onChange(JSON.stringify(filter))
    }, [filter])

    return (
        <div style={filterStyle}>
            <div>{header}</div>
            <div>
                {filterList.map((_, index) => {
                    let param = booleanFilterList[index]
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
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

