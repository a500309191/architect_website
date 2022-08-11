import React, {useState, useMemo } from "react";
import { Fetch } from "./../Fetch";
import { FiltersBlock } from "./Sorting-FiltersBlock/FiltersBlock";
import { SortingBlock } from "./Sorting-FiltersBlock/SortingBlock";
import { HousesList } from "./HousesList";
import { NoHouses } from "./NoHouses";
import { getBooleanFilters } from "./Sorting-FiltersBlock/filters/functions/getBooleanFilters";
import { shuffleArray } from "./functions/shuffleArray";


export const HousesListPage = () => {

    return (
        <Fetch
            uri = '/arch/api/houses/'
            renderSuccess = {({ data }) => {
                if (data.length > 0) return <HousesListPageView data={data}/>
                else return <NoHouses />
            }}
        />
    )
}

const HousesListPageView = ({data}) => {

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

    return (
        <div className="houses-list-page">
            <div className="sorting-filters-block">
                <SortingBlock
                    data={_data}
                    sortingData={sortingData => setSortingData(sortingData)}
                    sortingTypeHandler={sortingType => setSortingType(sortingType)}
                />
                <FiltersBlock
                    data={_data}
                    multipleCheckboxFilterList={multipleCheckboxFilterList}
                    booleanCheckboxFilterList={booleanCheckboxFilterList}
                    multipleCheckboxFiltersCollector={e => setMultipleCheckboxFilters(e)}
                    booleanCheckboxFiltersCollector={e => setBooleanCheckboxFilters(e)}
                    areaFilterCollector={e => setAreaFilter(e)}
                />
            </div>
            <HousesList
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
