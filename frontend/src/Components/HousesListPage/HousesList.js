import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { checkboxFilter } from "./Sorting-FiltersBlock/filters/functions/checkboxFilter";
import { pluralText } from "./functions/pluralText";
import { booleanToText } from "./functions/booleanToText";

export const HousesList = ({
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

    console.log("area-filter: ", area)
    console.log("multipleCheckbox-filter: ", multipleCheckbox)
    console.log("booleanCheckbox-filter: ", booleanCheckbox)

    const sortingTypeText = (house, sortingType) => {
        if (sortingType === "random") {
            return ""
        } else {
            return `${sortingType.toUpperCase()} ${house[sortingType]}`
        }
    }

    const filteredDataFunc = data => {
        let filteredHouses = []
        data.map((house, index) => {
            let multipleCheckboxFilter = checkboxFilter(house, multipleCheckbox, multipleCheckboxFilterList)
            let booleanCheckboxFilter = checkboxFilter(house, booleanCheckbox, booleanCheckboxFilterList)
            if (
                multipleCheckboxFilter &&
                booleanCheckboxFilter &&
                house.area >= area.minArea
                && house.area <= area.maxArea
            ) {
                filteredHouses.push(house)
            }})
        return filteredHouses
    }



    const filteredHouses = useMemo(() => (
        filteredDataFunc(data)
    ), [area, multipleCheckbox, booleanCheckbox])

    return (
        <>
            <div className="houses-list">
                {filteredHouses.map((house, index) => {
                        return (
                            <div className="house-block-container" key={index}>
                                <Link
                                    to={{pathname: `/houses/${house.model_name}`}}
                                    className={`${house.images.length === 0
                                        ? "house-block-without-image"
                                        : "house-block"}`
                                    }
                                    style = {house.images.length === 0
                                        ? { }
                                        : { backgroundImage: `url(${house.images[0]["thumbnail"]})` }
                                    }
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
                                <div className="house-block-no-image-info">{house.images.length === 0 && sortingType === "random" ? "NO IMAGE" : ""}</div>
                            </div>
                        )
                    }
                )}
            </div>
            <div className="houses-number">{filteredHouses.length} / HIDDEN: {data.length - filteredHouses.length}</div>
        </>
    )
}
