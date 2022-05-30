import React, { useState, useEffect, useRef, useMemo } from "react";
import { getHousesAreas } from "../../functions/getHousesAreas";
import MultiRangeSlider from "../MultiRangeSlider/MultiRangeSlider";
import { FiltersCollector } from "../FiltersCollector";

export const AreaFilter = ({data, onChange}) => {

    const housesAreas = useMemo(() => {
        return getHousesAreas(data)
    }, [data])

    const minArea = Math.floor(Math.min(...housesAreas))
    const maxArea = Math.ceil(Math.max(...housesAreas))

//    const [minAreaValue, setMinAreaValue] = useState(minArea)
//    const [maxAreaValue, setMaxAreaValue] = useState(maxArea)

    const [areaValueLimits, setAreaValueLimits] = useState(JSON.stringify({minArea, maxArea}))

    useEffect(() => {
        onChange(areaValueLimits)
    }, [areaValueLimits])

    return (
        <>
            <MultiRangeSlider
                min={minArea}
                max={maxArea}
                onChange={({min, max}) => {
                    setAreaValueLimits(JSON.stringify({min, max}))
                    setAreaValueLimits(JSON.stringify({min, max}))
                }}
            />
        </>
    )
}