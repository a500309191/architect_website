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

    const _data = useMemo(() => {
        return data
    }, [data])

    const shuffleData = useMemo(() => {
        return shuffleArray(_data)
    }, [_data])

    const [sortingData, setSortingData] = useState(shuffleData)
    const [sortingType, setSortingType] = useState("random")

    const [multipleCheckboxFilters, setMultipleCheckboxFilters] = useState()
    const [booleanCheckboxFilters, setBooleanCheckboxFilters] = useState()
    const [areaFilter, setAreaFilter] = useState()

    //This array sets filters sequence on the page
    const multipleCheckboxFilterList = [
        "floors",
        "material",
        "roof",
        "style",
        "bedroom",
        "bathroom",
        "entrance",
    ]

    const booleanCheckboxFilterList = useMemo(() =>
        getBooleanFilters(data), [data]
    )

    console.log("RANDOM")


    return (
        <div className="houses-list-page">
            <SortingBlock
                data={_data}
                sortingData={sortingData => setSortingData(sortingData)}
                sortingTypeHandler={sortingType => setSortingType(sortingType)}
            />
            <FiltersCollector
                data={_data}
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
                sortingType={sortingType}
            />
        </div>
    )
}

//    return (
//        <div className="houses-list-page">
//            <SortingBlock
//                data={data}
//                sortingData={sortingData => setSortingData(sortingData)}
//                sortingTypeHandler={sortingType => setSortingType(sortingType)}
//            />
//            <FiltersCollector
//                data={data}
//                multipleCheckboxFilterList={multipleCheckboxFilterList}
//                booleanCheckboxFilterList={booleanCheckboxFilterList}
//                multipleCheckboxFiltersCollector={e => setMultipleCheckboxFilters(e)}
//                booleanCheckboxFiltersCollector={e => setBooleanCheckboxFilters(e)}
//                areaFilterCollector={e => setAreaFilter(e)}
//            />
//            <HouseList
//                data={sortingData}
//                multipleCheckboxFilters={multipleCheckboxFilters}
//                booleanCheckboxFilters={booleanCheckboxFilters}
//                areaFilter={areaFilter}
//                multipleCheckboxFilterList={multipleCheckboxFilterList}
//                booleanCheckboxFilterList={booleanCheckboxFilterList}
//                sortingType={sortingType}
//            />
//        </div>
//    )
//}