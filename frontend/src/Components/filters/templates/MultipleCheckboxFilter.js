import React, { useState, useEffect } from "react";
import { getFilterParams } from "./functions/getFilterParams";

export const MultipleCheckboxFilter = ({
        data,
        multipleCheckboxFilterList,
        onChange,
        checkboxStyle,
        textStyle,
        countStyle,
        filterStyle,
    }) => {

    const filters = {}
    const [filterDict, setFilterDict] = useState(filters)

    useEffect(() => {
        onChange(JSON.stringify(filterDict))
    }, [filterDict])

    return (
        <div>
            {multipleCheckboxFilterList.map((filterType, index1) => {

                let [filterParamsCountDict, filterParamsList] = getFilterParams({filterType, data})
                filters[filterType] = filterParamsList

                return (
                    <div key={index1} style={filterStyle}>
                        <div>{filterType.toUpperCase()} FILTER</div>
                        {filterParamsList.map((param, _) => {

                            let count = filterParamsCountDict[param]

                            return (
                                <div key={param} style={checkboxStyle}>
                                    <input
                                        id={`${filterType}_${param}`}
                                        type="checkbox"
                                        defaultChecked
                                        onChange={() => {
                                            setFilterDict(filterDict => {
                                                let input = document.getElementById(`${filterType}_${param}`)

                                                if (input.checked) {
                                                    filterDict[filterType].push(param)
                                                }
                                                if (!input.checked) {
                                                    filterDict[filterType]
                                                    = filterDict[filterType].filter(item => item != param)
                                                }

                                                return { ...filterDict }
                                        })}}
                                    />
                                    <label style={textStyle}>{param}</label>
                                    <label style={countStyle}>[{count}]</label>
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}