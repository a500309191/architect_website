import React, { useState, useEffect } from "react";
import { getNotBooleanFilters } from "./functions/getNotBooleanFilters";
import { getFilterParams } from "./functions/getFilterParams";
import { makeFilterList } from "./functions/makeFilterList";

export const MultipleCheckboxFilter = ({
        data,
        multipleCheckboxFilterList,
        onChange,
        checkboxStyle,
        textStyle,
        countStyle,
        filterStyle,
    }) => {

    const filters = []
    const [filterList, setFilterList] = useState(filters)

    useEffect(() => {
        onChange(JSON.stringify(filterList))
    }, [filterList])

    return (
        <div>
            {multipleCheckboxFilterList.map((filterType, index1) => {

                let [filterParamsCountDict, filterParamsList] = getFilterParams({filterType, data})
                let filterList = makeFilterList(filterParamsList)

                let filter = { [`${filterType}`]:filterList }
                filters.push(filter)

                return (
                    <div key={index1} style={filterStyle}>
                        <div>{filterType.toUpperCase()} FILTER</div>
                        {filterList.map((_, index2) => {

                            let param = filterParamsList[index2]
                            let count = filterParamsCountDict[param]

                            return (
                                <div key={index2} style={checkboxStyle}>
                                    <input
                                        type="checkbox"
                                        defaultChecked
                                        onChange = {() => {
                                            setFilterList(
                                                filterList => {
                                                    filterList[index1][filterType][index2][param]
                                                    = !filterList[index1][filterType][index2][param]
                                                    return [...filterList]
                                                }
                                            )}
                                        }

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
