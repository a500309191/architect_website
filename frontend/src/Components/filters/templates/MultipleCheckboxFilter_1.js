import React, { useState, useEffect, useMemo } from "react";
import { getFilterParams } from "./functions/getFilterParams";

export const MultipleCheckboxFilter = ({
        data,
        multipleCheckboxFilterList,
        onChange,
    }) => {

    const filters = {}
    const [filterDict, setFilterDict] = useState(filters)
    const [tumbler, setTumbler] = useState(true)
    console.log(tumbler)
    const [memoFilterList, setMemoFilterList]  = useState([])
    console.log(memoFilterList)

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
                        <div
                            className="filter-header"
                            onClick={() => {

                                setMemoFilterList(memoFilterList => {
                                    if (memoFilterList.includes(filterType)) {
                                        setTumbler(false)
                                        memoFilterList = memoFilterList.filter(item => item != filterType)
                                    } else {
                                        setTumbler(!tumbler)
                                        memoFilterList = [...memoFilterList, filterType]
                                    }
                                    return [...memoFilterList]
                                })

                                setFilterDict(filterDict => {
                                    if (tumbler) { filterDict[filterType] = [] }
                                    if (!tumbler) { filterDict[filterType] = filterParamsList }
                                    return { ...filterDict }
                                })

                                let checkboxes = document.getElementsByClassName(`${filterType}-checkbox`)
                                for (let i=0; i<checkboxes.length; i++) {
                                    let checkbox = checkboxes[i]
                                    if (tumbler) {checkbox.checked = false} else {checkbox.checked = true}
                                }
                                //setTumbler(!tumbler)
                            }}
                        >
                            {filterType.toUpperCase()} FILTER
                        </div>
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