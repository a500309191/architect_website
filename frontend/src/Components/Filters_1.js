import React, { useState, useEffect, useRef, useMemo } from "react";
import { getHousesAreas } from "../functions/getHousesAreas";
import MultiRangeSlider from "./MultiRangeSlider/MultiRangeSlider";
import { Link } from "react-router-dom";
import { House } from "./House";
import { List } from "./List";
import { AreaFilter } from "./filters/AreaFilter"

export const Filters = ({data}) => {
    const housesAreas = useMemo(() => {
        return getHousesAreas(data)
    }, [data])

    const minArea = Math.floor(Math.min(...housesAreas))
    const maxArea = Math.ceil(Math.max(...housesAreas))

    const [minSliderValue, setMinSliderValue] = useState(minArea)
    const [maxSliderValue, setMaxSliderValue] = useState(maxArea)

    return (
        <>
            <MultiRangeSlider
                min={minArea}
                max={maxArea}
                onChange={({min, max}) => {
                    setMinSliderValue(min)
                    setMaxSliderValue(max)
                }}
            />

            <List
                data={data}
                minSliderValue={minSliderValue}
                maxSliderValue={maxSliderValue}
            />
        </>
    )
}

