import React, { useState, useEffect, useMemo } from "react";
import { getFilterParams } from "./functions/getFilterParams";

export const MultipleCheckboxFilter = ({
        data,
        multipleCheckboxFilterList,
        onChange,
    }) => {

    const filters = {}
    const [filterDict, setFilterDict] = useState(filters)
    const [memoFilterList, setMemoFilterList]  = useState([])

    useEffect(() => {
        onChange(JSON.stringify(filterDict))
    }, [filterDict])


    return (
        <div className="multiple-checkbox-filters" style={{ zIndex:"1" }}>
            {multipleCheckboxFilterList.map((filterType, index1) => {

                let [filterParamsCountDict, filterParamsList] = getFilterParams({filterType, data})
                filters[filterType] = filterParamsList

                return (
                    <div
                        className="multiple-checkbox-filter"
                        key={index1}
                    >
                        <div className="filter-header"> {filterType.toUpperCase()} FILTER:</div>
                        <div
                            className="multiple-checkbox-filter-clicker"
                            onClick={() => {
                                let check

                                if (filterDict[filterType].length == 0) {
                                    setMemoFilterList([...memoFilterList, filterType])
                                    check = true
                                }
                                if (filterDict[filterType] == filterParamsList) {
                                    setMemoFilterList(memoFilterList.filter(item => item != filterType))
                                    check = false
                                }

                                if (check) {
                                    setMemoFilterList(memoFilterList.filter(item => item != filterType))
                                    setFilterDict(filterDict => {
                                        filterDict[filterType] = filterParamsList
                                        return { ...filterDict }
                                    })
                                } else {
                                    setMemoFilterList([...memoFilterList, filterType])
                                    setFilterDict(filterDict => {
                                        filterDict[filterType] = []
                                        return { ...filterDict }
                                    })
                                }

                                let checkboxes = document.getElementsByClassName(`${filterType}-checkbox`)
                                for (let i=0; i<checkboxes.length; i++) {
                                    let checkbox = checkboxes[i]
                                    if (check) {checkbox.checked = true} else {checkbox.checked = false}
                                }
                            }}
                        ></div>

                        {filterParamsList.map((param, _) => {

                            let count = filterParamsCountDict[param]

                            return (
                                <div
                                    className="multiple-checkbox-filter-param"
                                    key={param}
                                >
                                    <input
                                        id={`${filterType}_${param}`}
                                        className={`${filterType}-checkbox`}
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
                                    <label className="multiple-checkbox-filter-text">{param}</label>
                                    <label className="multiple-checkbox-filter-count">[{count}]</label>
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}