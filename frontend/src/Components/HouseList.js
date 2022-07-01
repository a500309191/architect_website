import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { checkboxFilter } from "./filters/functions/checkboxFilter";
import { pluralText } from "../functions/pluralText";
import { booleanToText } from "../functions/booleanToText";

const address = 'http://127.0.0.1:8000/media/'

export const HouseList = ({
        data,
        areaFilter,
        multipleCheckboxFilters,
        booleanCheckboxFilters,
        multipleCheckboxFilterList,
        booleanCheckboxFilterList,
        sortingType,
    }) => {

    const area = areaFilter ? JSON.parse(areaFilter) : {}
    const multipleCheckbox = multipleCheckboxFilters ? JSON.parse(multipleCheckboxFilters) : {}
    const booleanCheckbox = booleanCheckboxFilters ? JSON.parse(booleanCheckboxFilters) : {}

//    console.log(area)
//    console.log(multipleCheckbox)
//    console.log(booleanCheckbox)

    const sortingTypeText = (house, sortingType) => {
        if (sortingType == "random") {
            return ""
        } else {
            return `${sortingType.toUpperCase()} ${house[sortingType]}`
        }
    }

    return (
            <div className="houses-list">
                {data.map((house, index) => {

                    let multipleCheckboxFilter = checkboxFilter(house, multipleCheckbox, multipleCheckboxFilterList)
                    let booleanCheckboxFilter = checkboxFilter(house, booleanCheckbox, booleanCheckboxFilterList)

                    if (
                        multipleCheckboxFilter &&
                        booleanCheckboxFilter &&
                        house.area >= area.minArea &&
                        house.area <= area.maxArea
                    ) {
                        return (
                            <div className="house-block-container" key={index}>
                                <Link
                                    to={{pathname: `/houses/${house.id}`}}
                                    className="house-block"
                                    style = {{ backgroundImage: `url(${address}${house.thumbnails[0]})` }}
                                >
                                    <div className="house-block-name">{house.model_name}</div>
                                    <div className="house-block-details">
                                        <div >{house.area} m²</div>
                                        <div>{house.material}</div>
                                        <div>{house.floors} floor{pluralText(house.floors)}</div>
                                        <div>{house.bedroom} bedroom{pluralText(house.bedroom)}</div>
                                        <div>{house.bathroom} bathroom{pluralText(house.bathroom)}</div>
                                        <div>{booleanToText(house.garage, "garage").toLowerCase()}</div>
                                    </div>
                                </Link>
                                <div className="house-block-sorting-info">{sortingTypeText(house, sortingType)}</div>
                            </div>
                        )
                    }
                })}
            </div>
    )
}
