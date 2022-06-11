import React, { useState, useEffect, useMemo } from "react";
import { getHousesAreas } from "../../functions/getHousesAreas";
import MultiRangeSlider from "./templates/MultiRangeSlider/MultiRangeSlider";

export const AreaFilter = ({data, onChange}) => {

    const housesAreas = useMemo(() => {
        return getHousesAreas(data)
    }, [data])

    const minArea = Math.floor(Math.min(...housesAreas))
    const maxArea = Math.ceil(Math.max(...housesAreas))

    return (
        <>
            <MultiRangeSlider
                min={minArea}
                max={maxArea}
                onChange={event => onChange(JSON.stringify(
                    {minArea: event.min, maxArea: event.max}
                ))}
            />
        </>
    )
}