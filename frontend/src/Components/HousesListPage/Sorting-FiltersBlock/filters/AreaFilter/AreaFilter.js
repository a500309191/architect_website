import React, { useState, useEffect, useMemo } from "react";
import { getHousesAreas } from "../functions/getHousesAreas";
import MultiRangeSlider from "./MultiRangeSlider/MultiRangeSlider";

export const AreaFilter = ({
        data,
        onChange,
    }) => {

    const housesAreas = useMemo(() => {
        return getHousesAreas(data)
    }, [data])

    const minArea = Math.floor(Math.min(...housesAreas))
    const maxArea = Math.ceil(Math.max(...housesAreas))

    return (
        <div className="area-filter">
            <div className="filter-header">AREA FILTER [m²]:</div>
            <MultiRangeSlider
                min={minArea}
                max={maxArea}
                onChange={event => onChange(JSON.stringify(
                    {minArea: event.min, maxArea: event.max}
                ))}
            />
        </div>
    )
}