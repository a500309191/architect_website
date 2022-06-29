import React, { useState, useRef } from "react";
import { shuffleArray } from "../functions/shuffleArray";
import { sortArray } from "../functions/sortArray";

export const SortingBlock = ({
        data,
        sortingData,
    }) => {

    const [sortingDirection, setSortingDirection] = useState(true)
    const areaSortingRef = useRef(null)
    const bedSortingRef = useRef(null)
    const bathSortingRef = useRef(null)

    const activeStyle = sortingDirection => {
        if (sortingDirection) { return "sorting-max-min" }
        else { return "sorting-min-max" }
    }

    return (
        <div className="sorting-block">
            <div
                className="random-sorting"
                onClick={() => {
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
                    let sortedData = sortArray(data, "area", sortingDirection)
                    sortingData(sortedData)
                    setSortingDirection(!sortingDirection)
                    areaSortingRef.current.className = `${sortingDirection ? "sorting-max-min" : "sorting-min-max"}`

                    bedSortingRef.current.className = "bedroom-sorting"
                    bathSortingRef.current.className = "bathroom-sorting"
                }}
            >
            </div>
            <div
                ref={bedSortingRef}
                className="bedroom-sorting"
                onClick={() => {
                    let sortedData = sortArray(data, "bedroom", sortingDirection)
                    sortingData(sortedData)
                    setSortingDirection(!sortingDirection)
                    bedSortingRef.current.className = `${sortingDirection ? "sorting-max-min" : "sorting-min-max"}`

                    areaSortingRef.current.className = "area-sorting"
                    bathSortingRef.current.className = "bathroom-sorting"
                }}
            >
            </div>
            <div
                ref={bathSortingRef}
                className="bathroom-sorting"
                onClick={() => {
                    let sortedData = sortArray(data, "bathroom", sortingDirection)
                    sortingData(sortedData)
                    setSortingDirection(!sortingDirection)
                    bathSortingRef.current.className = `${sortingDirection ? "sorting-max-min" : "sorting-min-max"}`

                    areaSortingRef.current.className = "area-sorting"
                    bedSortingRef.current.className = "bedroom-sorting"
                }}
            >
            </div>
        </div>
    )
}