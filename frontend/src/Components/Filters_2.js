import React, { useState, useEffect, useRef, useMemo } from "react";
import { getHousesAreas } from "../functions/getHousesAreas";
import MultiRangeSlider from "./MultiRangeSlider/MultiRangeSlider";
import { Link } from "react-router-dom";
import { House } from "./House";
import { List } from "./List";
import { AreaFilter } from "./filters/AreaFilter";
import { FloorFilter } from "./filters/FloorFilter";
import { FiltersCollector } from "./FiltersCollector";

export const Filters = ({data}) => {

//    const [minAreaValue, setMinAreaValue] = useState()
//    const [maxAreaValue, setMaxAreaValue] = useState()
//    const handleAreaValuesChange = (minAreaValue, maxAreaValue) => {
//        setMinAreaValue(minAreaValue)
//        setMaxAreaValue(maxAreaValue)
//    }

    const [areaValueLimits, setAreaValueLimits] = useState()
    const handleAreaValuesChange = (areaValueLimits) => {
        setAreaValueLimits(areaValueLimits)
    }

    const [floors, setFloors] = useState()
    const handleFloorsChange = (floors) => {
        setFloors(floors)
    }

    return (
        <>
            <AreaFilter
                data={data}
                onChange={handleAreaValuesChange}
            />
            <h3>{areaValueLimits}</h3>

            <FloorFilter
                onChangeFloors={handleFloorsChange}
            />
            <h3>{floors}</h3>
        </>
    )
}

