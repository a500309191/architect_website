import React, { useState, useEffect, useRef, useMemo } from "react";
import { MultipleCheckboxFilter } from "./filters/templates/MultipleCheckboxFilter";
import { CheckboxBooleanValueFilter } from "./filters/templates/CheckboxBooleanValueFilter";
import { AreaFilter } from "./filters/AreaFilter";


export const FiltersCollector = ({
        data,
        checkboxFiltersCollector,
        areaFilterCollector
    }) => {

    console.log("FILTERS COLLECTOR")

    const [areaFilter, setAreaFilter] = useState()
    const [multipleCheckboxFilters, setMultipleCheckboxFilters] = useState()
    const [singleCheckboxFilters, setSingleCheckboxFilters] = useState()

    const HandleCheckboxFiltersChange = checkboxFilters => {
        checkboxFiltersCollector(checkboxFilters)
    }
    const HandleAreaFilterChange = checkboxFilters => {
        areaFilterCollector(areaFilter)
    }

    useEffect(() => {
        HandleCheckboxFiltersChange([multipleCheckboxFilters, singleCheckboxFilters])
        HandleAreaFilterChange(areaFilter)
    }, [multipleCheckboxFilters, singleCheckboxFilters, areaFilter])

    //This array sets filters sequence on the page
    const multipleCheckboxFilterList = [
        "floors",
        "material",
        "roof",
        "size",
        "style",
        "bedroom",
        "bathroom",
        "entrance",
    ]

    const checkboxStyle = { display: "block" }
    const textStyle = { marginLeft: "5" }
    const countStyle = { opacity: "0.5", marginLeft: "5" }
    const filterStyle = { margin: "5", backgroundColor: "#CFD1E1" }
    const booleanStyle = { marginTop: "25" }

    return (
        <>
            <div>
                <AreaFilter
                    data={data}
                    onChange={e => setAreaFilter(e)}
                />
            </div>

            <div>
                <MultipleCheckboxFilter
                    data={data}
                    multipleCheckboxFilterList={multipleCheckboxFilterList}
                    onChange={e => setMultipleCheckboxFilters(e)}
                    checkboxStyle={checkboxStyle}
                    textStyle={textStyle}
                    countStyle={countStyle}
                    filterStyle={filterStyle}
                />
            </div>

            <div>
                <CheckboxBooleanValueFilter
                    data={data}
                    checkboxStyle={checkboxStyle}
                    onChange={e => setSingleCheckboxFilters(e)}
                    header="BOOLEAN FILTERS"
                    textStyle={textStyle}
                    countStyle={countStyle}
                    filterStyle={filterStyle}
                    booleanStyle={booleanStyle}
                />
            </div>
        </>
    )
}


