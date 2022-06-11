import React, {useState, useEffect } from "react";
import { Fetch } from "./Fetch";
import { FiltersCollector } from "./FiltersCollector";
import { HouseList } from "./HouseList";


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

    return (
        <div>
            <FiltersCollector
                data={data}

//                multipleCheckboxFiltersCollector={e => setMultipleCheckboxFilters(e)}
//                booleanCheckboxFiltersCollector={e => setBooleanCheckboxFilters(e)}
//                areaFilterCollector={e => setAreaFilter(e)}

                multipleCheckboxFiltersCollector={e => setMultipleCheckboxFilters(e)}
                booleanCheckboxFiltersCollector={e => setBooleanCheckboxFilters(e)}
                areaFilterCollector={e => setAreaFilter(e)}
            />
            <HouseList
                data={data}
                multipleCheckboxFilters={multipleCheckboxFilters}
                booleanCheckboxFilters={booleanCheckboxFilters}
                areaFilter={areaFilter}
            />
        </div>
    )
}

