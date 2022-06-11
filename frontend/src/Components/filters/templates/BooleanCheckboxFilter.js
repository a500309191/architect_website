import React, { useState, useEffect } from "react";
import { getBooleanFilters } from "./functions/getBooleanFilters";
import { makeBooleanFilterDict } from "./functions/makeBooleanFilterDict";

export const BooleanCheckboxFilter = ({
        data,
        checkboxStyle,
        onChange,
        header,
        textStyle,
        countStyle,
        filterStyle,
        booleanStyle,
    }) => {

    const booleanFilterList = getBooleanFilters(data)
    const filterDict = makeBooleanFilterDict(booleanFilterList)

    const [filters, setFilters] = useState(filterDict)

    useEffect(() => {
        onChange(JSON.stringify(filters))
    }, [filters])

    return (
        <div style={filterStyle}>
            <div>{header}</div>
            <div>
                {booleanFilterList.map((param, index) => {
                    return (
                        <div key={index} style={checkboxStyle}>
                            <input
                                type="checkbox"
                                id={`input1_${index}`}
                                defaultChecked
                                onChange = {() => setFilters(
                                    filters => {
                                        if (
                                            filters[param][0] == true &&
                                            filters[param][1] == false
                                            ) {
                                              filters[param][0] = false
                                              filters[param][1] = true
                                            let input2 = document.getElementById(`input2_${index}`)
                                            input2.checked = !input2.checked
                                        } else {
                                            filters[param][0] = !filters[param][0]
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
                                        if (
                                            filters[param][1] == true &&
                                            filters[param][0] == false
                                            ) {
                                              filters[param][1] = false
                                              filters[param][0] = true
                                            let input1 = document.getElementById(`input1_${index}`)
                                            input1.checked = !input1.checked
                                        } else {
                                            filters[param][1] = !filters[param][1]
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


//    return (
//        <div style={filterStyle}>
//            <div>{header}</div>
//            <div>
//                {booleanFilterList.map((param, index) => {
//                    return (
//                        <div key={index} style={checkboxStyle}>
//                            <input
//                                type="checkbox"
//                                id={`input1_${index}`}
//                                defaultChecked
//                                onChange = {() => setFilters(
//                                    filters => {
//                                        filters[param][0] = !filters[param][0]
//                                        return { ...filters }
//                                    }
//                                )}
//                            />
//                            <label style={booleanStyle}>+</label>
//                            <input
//                                type="checkbox"
//                                id={`input2_${index}`}
//                                defaultChecked
//                                onChange = {() => setFilters(
//                                    filters => {
//                                        filters[param][1] = !filters[param][1]
//                                        return { ...filters }
//                                    }
//                                )}
//                            />
//                            <label style={booleanStyle}>-</label>
//                            <label style={textStyle}>{param}</label>
//                        </div>
//                    )
//                })}
//            </div>
//        </div>
//    )
//}
