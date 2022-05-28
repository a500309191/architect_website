import React, { useState, useEffect } from "react";
import { getHousesAreas } from "../functions/getHousesAreas";
import MultiRangeSlider from "./MultiRangeSlider/MultiRangeSlider";


export const AreaFilter = ({data}) => {
    let housesAreas = getHousesAreas(data)
    console.log("housesAreas: ", housesAreas)

    let minA = Math.floor(Math.min(...housesAreas))
    let maxA = Math.ceil(Math.max(...housesAreas))

    let [minArea, setMinArea] = useState(minA);
    let [maxArea, setMaxArea] = useState(maxA);

    return (
        <MultiRangeSlider
            min={minArea}
            max={maxArea}
            onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
        />
    )
}

