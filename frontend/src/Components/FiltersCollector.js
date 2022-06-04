import React, { useState, useEffect, useRef, useMemo } from "react";
import { MultipleCheckboxFilter } from "./filters/templates/MultipleCheckboxFilter";
import { SingleCheckboxFilters } from "./filters/templates/SingleCheckboxFilters";
import { AreaFilter } from "./filters/AreaFilter";


export const FiltersCollector = ({data}) => {

    const [areaFilter, setAreaFilter] = useState()
    const [multipleCheckboxFilters, setMultipleCheckboxFilters] = useState()
    const [singleCheckboxFilters, setSingleCheckboxFilters] = useState()

    const [filters, setFilters] = useState()

    useEffect(() => {
        setFilters([areaFilter, multipleCheckboxFilters, singleCheckboxFilters])
    }, [areaFilter, multipleCheckboxFilters, singleCheckboxFilters])

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

    return (
        <>
            <div>
                <AreaFilter
                    data={data}
                    onChange={ e => setAreaFilter(e)}
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
                <SingleCheckboxFilters
                    data={data}
                    checkboxStyle={checkboxStyle}
                    onChange={e => setSingleCheckboxFilters(e)}
                    header="BOOLEAN FILTERS"
                    textStyle={textStyle}
                    countStyle={countStyle}
                    filterStyle={filterStyle}
                />
            </div>

            <div style = {{ margin: "10", marginLeft: "0"}}>
                <h3>{JSON.stringify(filters)}</h3>
            </div>
        </>
    )
}
