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
    return (
        <div className="filters-collector">
            <AreaFilter
                data={data}
                onChange={e => areaFilterCollector(e)}
            />
            <MultipleCheckboxFilter
                data={data}
                multipleCheckboxFilterList={multipleCheckboxFilterList}
                onChange={e => multipleCheckboxFiltersCollector(e)}
            />
            <BooleanCheckboxFilter
                data={data}
                booleanCheckboxFilterList={booleanCheckboxFilterList}
                onChange={e => booleanCheckboxFiltersCollector(e)}
                header="BOOLEAN FILTERS:"
            />
        </div>
    )
}


