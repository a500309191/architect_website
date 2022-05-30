import React, { useState } from "react";
import { List } from "./List";

export const FiltersCollector = ({
        data,
        minSliderValue,
        maxSliderValue
    }) => {
    console.log(minSliderValue, maxSliderValue)
    return [minSliderValue, maxSliderValue]
}


