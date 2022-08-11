import React, { useState, useEffect, useRef } from "react";
import { shuffleArray } from "../functions/shuffleArray";
import { sortArray } from "../functions/sortArray";

export const SortingBlock = ({
        data,
        sortingData,
        sortingTypeHandler,
    }) => {

    const [sortingList, setSortingList] = useState([])
    const [sortingType, setSortingType] = useState("random")
    const areaSortingRef = useRef(null)
    const bedSortingRef = useRef(null)
    const bathSortingRef = useRef(null)

    const toggleArrow = sortingType => {
        if (sortingList.includes(sortingType)) {
            sortingData(sortArray(data, sortingType, "min-max"))
            setSortingList([])
        } else {
            sortingData(sortArray(data, sortingType, "max-min"))
            setSortingList([sortingType])
        }
    }

    const sortingTypeText = sortingType => {
        if (sortingType === "random") {
            return "RANDOM SORTING"
        } else if (sortingType === "area") {
            return "AREA SORTING:"
        } else if (sortingType === "bedroom") {
            return "BEDROOM SORTING:"
        } else if (sortingType === "bathroom") {
            return "BATHROOM SORTING:"
        }
    }

    useEffect(() => {
        sortingTypeHandler(sortingType)
    }, [sortingType])

    return (
        <div className="sorting-block">
            <div className="sorting-icons">
                <div
                    className={`${sortingType === "random" ? "random-sorting" : "regular-sorting"}`}
                    onClick={() => {
                        setSortingType("random")
                        setSortingList([])
                        sortingData(shuffleArray(data))
                        areaSortingRef.current.className = "area-sorting"
                        bedSortingRef.current.className = "bedroom-sorting"
                        bathSortingRef.current.className = "bathroom-sorting"
                    }}
                >
                </div>
                <div
                    ref={areaSortingRef}
                    className="area-sorting"
                    onClick={() => {
                        setSortingType("area")
                        toggleArrow("area")
                        areaSortingRef.current.className = `${sortingList.includes("area") ? "sorting-min-max" : "sorting-max-min"}`
                        bedSortingRef.current.className = "bedroom-sorting"
                        bathSortingRef.current.className = "bathroom-sorting"
                    }}
                >
                </div>
                <div
                    ref={bedSortingRef}
                    className="bedroom-sorting"
                    onClick={() => {
                        setSortingType("bedroom")
                        toggleArrow("bedroom")
                        bedSortingRef.current.className = `${sortingList.includes("bedroom") ? "sorting-min-max" : "sorting-max-min"}`
                        areaSortingRef.current.className = "area-sorting"
                        bathSortingRef.current.className = "bathroom-sorting"
                    }}
                >
                </div>
                <div
                    ref={bathSortingRef}
                    className="bathroom-sorting"
                    onClick={() => {
                        setSortingType("bathroom")
                        toggleArrow("bathroom")
                        bathSortingRef.current.className = `${sortingList.includes("bathroom") ? "sorting-min-max" : "sorting-max-min"}`
                        areaSortingRef.current.className = "area-sorting"
                        bedSortingRef.current.className = "bedroom-sorting"
                    }}
                >
                </div>
            </div>
            <div className="sorting-info">
                {sortingTypeText(sortingType)}
                {sortingType !== "random"
                    ? `${sortingList.length !== 0 ? " MAX TO MIN" : " MIN TO MAX"}`
                    : ""
                }
            </div>
        </div>
    )
}
