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
    const filterList = makeBooleanFilterDict(booleanFilterList)
    console.log(filterList)

    const [filter, setFilter] = useState(filterList)

    useEffect(() => {
        onChange(JSON.stringify(filter))
    }, [filter])

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
                                onChange = {e => {
                                    setFilter(filterList => {
                                        if (
                                            filterList[index][param][0] == true &&
                                            filterList[index][param][1] == false
                                            ) {
                                              filterList[index][param][0] = false
                                              filterList[index][param][1] = true
                                            let input2 = document.getElementById(`input2_${index}`)
                                            input2.checked = !input2.checked
                                        } else {
                                            filterList[index][param][0] = !filterList[index][param][0]
                                        }
                                        return [...filterList]
                                    })}}
                            />
                            <label style={booleanStyle}>+</label>
                            <input
                                type="checkbox"
                                id={`input2_${index}`}
                                defaultChecked
                                onChange = {() => {
                                    setFilter(filterList => {
                                        if (
                                            filterList[index][param][1] == true &&
                                            filterList[index][param][0] == false
                                            ) {
                                              filterList[index][param][1] = false
                                              filterList[index][param][0] = true
                                            let input1 = document.getElementById(`input1_${index}`)
                                            input1.checked = !input1.checked
                                        } else {
                                            filterList[index][param][1] = !filterList[index][param][1]
                                        }
                                        return [...filterList]
                                    })}}
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

