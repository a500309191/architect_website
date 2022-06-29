import React, {useState, useEffect, useMemo } from "react";
import { Fetch } from "./Fetch";
import { FiltersCollector } from "./FiltersCollector";
import { HouseList } from "./HouseList";
import { SortingBlock } from "./SortingBlock";
import { NoHouses } from "./NoHouses";
import { getBooleanFilters } from "./filters/templates/functions/getBooleanFilters";
import { shuffleArray } from "../functions/shuffleArray";

const address = 'http://127.0.0.1:8000/media/'

export const HousesListPage = () => {
    return (
        <Fetch
            uri = 'http://127.0.0.1:8000/api/house/'
            renderSuccess = {({ data }) => {
                if (data.length > 0) return <HouseListPageView data={data}/>
                else return <NoHouses />
            }}
        />
    )
}

const HouseListPageView = ({data}) => {

    console.log(data)

    const shuffleData = useMemo(() => {
        return shuffleArray(data)
    }, [data])
    const [sortingData, setSortingData] = useState(shuffleData)

    const [multipleCheckboxFilters, setMultipleCheckboxFilters] = useState()
    const [booleanCheckboxFilters, setBooleanCheckboxFilters] = useState()
    const [areaFilter, setAreaFilter] = useState()

    //This array sets filters sequence on the page
    const multipleCheckboxFilterList = [
        "floors",
        "material",
        "roof",
        "size",
        "style",
        "bedroom",
        "bathroom",
        "entrance",
    ]

    const booleanCheckboxFilterList = useMemo(() =>
        getBooleanFilters(data), [data]
    )

    useEffect (() => {
        console.log(sortingData)
    }, [sortingData])

    return (
        <div className="houses-list-page">
            <SortingBlock
                data={data}
                sortingData={sortingData => setSortingData(sortingData)}
            />
            <FiltersCollector
                data={data}
                multipleCheckboxFilterList={multipleCheckboxFilterList}
                booleanCheckboxFilterList={booleanCheckboxFilterList}
                multipleCheckboxFiltersCollector={e => setMultipleCheckboxFilters(e)}
                booleanCheckboxFiltersCollector={e => setBooleanCheckboxFilters(e)}
                areaFilterCollector={e => setAreaFilter(e)}
            />
            <HouseList
                data={sortingData}
                multipleCheckboxFilters={multipleCheckboxFilters}
                booleanCheckboxFilters={booleanCheckboxFilters}
                areaFilter={areaFilter}
                multipleCheckboxFilterList={multipleCheckboxFilterList}
                booleanCheckboxFilterList={booleanCheckboxFilterList}
            />
        </div>
    )
}



//    return (
//        <div className="houses-list-page">
//            <FiltersCollector
//                data={data}
//                multipleCheckboxFilterList={multipleCheckboxFilterList}
//                booleanCheckboxFilterList={booleanCheckboxFilterList}
//                multipleCheckboxFiltersCollector={e => setMultipleCheckboxFilters(e)}
//                booleanCheckboxFiltersCollector={e => setBooleanCheckboxFilters(e)}
//                areaFilterCollector={e => setAreaFilter(e)}
//            />
//            <HouseList
//                data={data}
//                multipleCheckboxFilters={multipleCheckboxFilters}
//                booleanCheckboxFilters={booleanCheckboxFilters}
//                areaFilter={areaFilter}
//                multipleCheckboxFilterList={multipleCheckboxFilterList}
//                booleanCheckboxFilterList={booleanCheckboxFilterList}
//            />
//        </div>
//    )
//}
