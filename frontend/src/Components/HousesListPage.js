import React, {useState, useEffect, useMemo } from "react";
import { Fetch } from "./Fetch";
import { FiltersCollector } from "./FiltersCollector";
import { HouseList } from "./HouseList";
import { getBooleanFilters } from "./filters/templates/functions/getBooleanFilters";


const address = 'http://127.0.0.1:8000/media/'

export const HousesListPage = () => {
    return (
        <Fetch
            uri = 'http://127.0.0.1:8000/api/house/'
            renderSuccess = {({ data }) => (
                <HouseListPageView
                    data={data}
                />
            )}
        />
    )
}

const HouseListPageView = ({data}) => {

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

    return (
        <div className="houses-list-page">
            <FiltersCollector
                data={data}
                multipleCheckboxFilterList={multipleCheckboxFilterList}
                booleanCheckboxFilterList={booleanCheckboxFilterList}
                multipleCheckboxFiltersCollector={e => setMultipleCheckboxFilters(e)}
                booleanCheckboxFiltersCollector={e => setBooleanCheckboxFilters(e)}
                areaFilterCollector={e => setAreaFilter(e)}
            />
            <HouseList
                data={data}
                multipleCheckboxFilters={multipleCheckboxFilters}
                booleanCheckboxFilters={booleanCheckboxFilters}
                areaFilter={areaFilter}
                multipleCheckboxFilterList={multipleCheckboxFilterList}
                booleanCheckboxFilterList={booleanCheckboxFilterList}
            />
        </div>
    )
}

