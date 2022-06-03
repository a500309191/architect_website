import React, { useState, useEffect } from "react";
import { getMaxFilterValue } from "./functions/getMaxFilterValue";
import { getFilterParams } from "./functions/getFilterParams";
import { makeFilterValueDict } from "./functions/makeFilterValueDict";

export const MultipleCheckboxFilterTemplate = ({
        data,
        filterType,
        onChange,
        checkboxStyle,
        textStyle,
        countStyle,
    }) => {

    const [filterParamsDict, filterParamsList] = getFilterParams({filterType, data})

    const filterValueDict = makeFilterValueDict(filterParamsList)
    const [filter, setFilter] = useState(filterValueDict)

    useEffect(() => {
        onChange(JSON.stringify(filter))
    }, [filter])

    return (
        <>
            <div>{filterType.toUpperCase()} FILTER</div>
            <div>
                {filterParamsList.map((param ,i) => {
                    let count = filterParamsDict[param]
                    return (
                        <div key={i} style={checkboxStyle}>
                            <input
                                type="checkbox"
                                defaultChecked
                                onChange = {() => {
                                    setFilter(filter => {
                                        return {
                                            ...filter,
                                            [`${param}`]: !filter[`${param}`]
                                        }
                                    })
                                }}
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


//            <div>{filterType.toUpperCase()} FILTER</div>
//            <div>
//                {Array(maxValue).fill("").map((_, i) => {
//                    return (
//                        <div key={i} style={checkboxStyle}>
//                            <input
//                                type="checkbox"
//                                defaultChecked
//                                onChange = {() => {
//                                    setFilter(filter => {
//                                        return {
//                                            ...filter,
//                                            [`${i+1}`]: !filter[`${i+1}`]
//                                        }
//                                    })
//                                }}
//                            />
//                            <div style={textStyle}>{i}</div>
//                        </div>
//                    )
//                })}
//            </div>