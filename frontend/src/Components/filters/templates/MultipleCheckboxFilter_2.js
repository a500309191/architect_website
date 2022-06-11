import React, { useState, useEffect } from "react";
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

    const filters = {}
    const [filterDict, setFilterDict] = useState(filters)

    useEffect(() => {
        onChange(JSON.stringify(filterDict))
    }, [filterDict])

    return (
        <div>
            {multipleCheckboxFilterList.map((filterType, index1) => {

                let [filterParamsCountDict, filterParamsList] = getFilterParams({filterType, data})
                let filterList = makeFilterList(filterParamsList)

                filters[filterType] = filterList

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
                                        onChange={() => setFilterDict(filters => {
                                            filters[filterType][index2][param] = !filters[filterType][index2][param]
                                            return { ...filters }
                                        })}
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


//                                        onChange={filters => setFilterList(filters => {
//                                            return {
//                                                ...filters,
//                                                [`${filterType}`] :
//                                                [ ...filters[filterType]]
//                                            }}
//                                        )}