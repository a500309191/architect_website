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

    const [minAreaValue, setMinAreaValue] = useState(minArea)
    const [maxAreaValue, setMaxAreaValue] = useState(maxArea)

    useEffect(() => {
        onChange(minAreaValue, maxAreaValue)
    }, [minAreaValue, maxAreaValue])

    return (
        <>
            <MultiRangeSlider
                min={minArea}
                max={maxArea}
                onChange={({min, max}) => {
                    setMinAreaValue(min)
                    setMaxAreaValue(max)
                }}
            />
        </>
    )
}