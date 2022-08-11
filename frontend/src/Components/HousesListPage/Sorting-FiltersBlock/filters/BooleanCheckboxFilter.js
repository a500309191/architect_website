import React, { useState, useEffect } from "react";
import { makeBooleanFilterDict } from "./functions/makeBooleanFilterDict";

export const BooleanCheckboxFilter = ({
        data,
        booleanCheckboxFilterList,
        onChange,
    }) => {

    const filterDict = makeBooleanFilterDict(booleanCheckboxFilterList)
    const [filters, setFilters] = useState(filterDict)

    useEffect(() => {
        onChange(JSON.stringify(filters))
    }, [filters])

    const paramHumanText = param => {
        switch (param) {
            case "kitchen_living_room":
                return "is kitchen connected with living room?"
            case "tech_room":
                return "house has a technical room?"
            case "terrace":
                return "house has a terrace?"
            case "garage":
                return "house has a garage?"
            default:
                return param
        }
    }

    return (
        <div className="boolean-checkbox-filter">
            <div className="filter-header">BOOLEAN FILTER:</div>
            <div className="yes-no-header">
                <div className="yes-header">YES</div>
                <div className="no-header">NO</div>
            </div>
            {booleanCheckboxFilterList.map((param, index) => {
                return (
                    <div className="boolean-checkbox-filter-param" key={index}>
                        <input
                            className="boolean-checkbox-yes"
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
                                        = filters[param].filter(item => item !== true)
                                    }
                                    return { ...filters }
                                }
                            )}
                        />
                        <input
                            className="boolean-checkbox-no"
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
                                        = filters[param].filter(item => item !== false)
                                    }
                                    return { ...filters }
                                }
                            )}
                        />
                        <label className="boolean-checkbox-filter-text">{paramHumanText(param)}</label>
                    </div>
                )
            })}
        </div>
    )
}

