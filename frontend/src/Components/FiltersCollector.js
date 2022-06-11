import React, { useState, useEffect, useRef, useMemo } from "react";
import { MultipleCheckboxFilter } from "./filters/templates/MultipleCheckboxFilter";
import { BooleanCheckboxFilter } from "./filters/templates/BooleanCheckboxFilter";
import { AreaFilter } from "./filters/AreaFilter";


export const FiltersCollector = ({
        data,
        multipleCheckboxFiltersCollector,
        booleanCheckboxFiltersCollector,
        areaFilterCollector
    }) => {

    //console.log("FiltersCollector")

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
                    onChange={e => areaFilterCollector(e)}
                />
            </div>

            <div>
                <MultipleCheckboxFilter
                    data={data}
                    multipleCheckboxFilterList={multipleCheckboxFilterList}
                    onChange={e => multipleCheckboxFiltersCollector(e)}
                    checkboxStyle={checkboxStyle}
                    textStyle={textStyle}
                    countStyle={countStyle}
                    filterStyle={filterStyle}
                />
            </div>

            <div>
                <BooleanCheckboxFilter
                    data={data}
                    checkboxStyle={checkboxStyle}
                    onChange={e => booleanCheckboxFiltersCollector(e)}
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


