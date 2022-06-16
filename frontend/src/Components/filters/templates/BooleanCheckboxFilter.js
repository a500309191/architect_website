import React, { useState, useEffect } from "react";
import { makeBooleanFilterDict } from "./functions/makeBooleanFilterDict";

export const BooleanCheckboxFilter = ({
        data,
        booleanCheckboxFilterList,
        onChange,
        header,
    }) => {

    const filterDict = makeBooleanFilterDict(booleanCheckboxFilterList)
    const [filters, setFilters] = useState(filterDict)

    useEffect(() => {
        onChange(JSON.stringify(filters))
    }, [filters])

    return (
        <div className="boolean-checkbox-filter">
            <div className="filter-header">{header}</div>
            <div>
                {booleanCheckboxFilterList.map((param, index) => {
                    return (
                        <div className="boolean-checkbox-filter-param" key={index}>
                            <input
                                type="checkbox"
                                id={`input1_${index}`}
                                defaultChecked
                                onChange = {() => setFilters(
                                    filters => {
                                        let input1 = document.getElementById(`input1_${index}`)
                                        if (input1.checked) {
                                            filters[param].push(true)
                                        }
                                        if (!input1.checked) {
                                            filters[param]
                                            = filters[param].filter(item => item != true)
                                        }
                                        return { ...filters }
                                    }
                                )}
                            />
                            <label className="boolean-checkbox-filter-value">+</label>
                            <input
                                type="checkbox"
                                id={`input2_${index}`}
                                defaultChecked
                                onChange = {() => setFilters(
                                    filters => {
                                        let input2 = document.getElementById(`input2_${index}`)
                                        if (input2.checked) {
                                            filters[param].push(false)
                                        }
                                        if (!input2.checked) {
                                            filters[param]
                                            = filters[param].filter(item => item != false)
                                        }
                                        return { ...filters }
                                    }
                                )}
                            />
                            <label className="boolean-checkbox-filter-value">-</label>
                            <label className="boolean-checkbox-filter-text">{param}</label>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

