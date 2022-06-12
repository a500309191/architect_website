import React, { useState, useEffect } from "react";
import { makeBooleanFilterDict } from "./functions/makeBooleanFilterDict";

export const BooleanCheckboxFilter = ({
        data,
        booleanCheckboxFilterList,
        checkboxStyle,
        onChange,
        header,
        textStyle,
        countStyle,
        filterStyle,
        booleanStyle,
    }) => {

    const filterDict = makeBooleanFilterDict(booleanCheckboxFilterList)
    const [filters, setFilters] = useState(filterDict)

    useEffect(() => {
        onChange(JSON.stringify(filters))
    }, [filters])

    return (
        <div style={filterStyle}>
            <div>{header}</div>
            <div>
                {booleanCheckboxFilterList.map((param, index) => {
                    return (
                        <div key={index} style={checkboxStyle}>
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
                            <label style={booleanStyle}>+</label>
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
                            <label style={booleanStyle}>-</label>
                            <label style={textStyle}>{param}</label>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

