import "./FiltersCollector.css";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { MultipleCheckboxFilter } from "./filters/templates/MultipleCheckboxFilter";
import { BooleanCheckboxFilter } from "./filters/templates/BooleanCheckboxFilter";
import { AreaFilter } from "./filters/AreaFilter";


export const FiltersCollector = ({
        data,
        multipleCheckboxFiltersCollector,
        booleanCheckboxFiltersCollector,
        areaFilterCollector,
        multipleCheckboxFilterList,
        booleanCheckboxFilterList,
    }) => {

    const checkboxStyle = { display: "block" }
    const textStyle = { marginLeft: "5" }
    const countStyle = { opacity: "0.5", marginLeft: "5" }
    const filterStyle = { margin: "5", backgroundColor: "#CFD1E1" }
    const booleanStyle = { marginTop: "25" }

    return (
        <div className="filters-collector">
            <div>
                <AreaFilter
                    data={data}
                    onChange={e => areaFilterCollector(e)}
                    filterStyle={filterStyle}
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
                    booleanCheckboxFilterList={booleanCheckboxFilterList}
                    checkboxStyle={checkboxStyle}
                    onChange={e => booleanCheckboxFiltersCollector(e)}
                    header="BOOLEAN FILTERS"
                    textStyle={textStyle}
                    countStyle={countStyle}
                    filterStyle={filterStyle}
                    booleanStyle={booleanStyle}
                />
            </div>
        </div>
    )
}


