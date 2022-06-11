import React, {useState, useEffect, useMemo } from "react";
import { Fetch } from "./Fetch";
import { FiltersCollector } from "./FiltersCollector";
import { List } from "./List";


const address = 'http://127.0.0.1:8000/media/'

export const HousesList = () => {
    return (
        <Fetch
            uri = 'http://127.0.0.1:8000/api/house/'
            renderSuccess = {({ data }) => (
                <HouseListView
                    data={data}
                />
            )}
        />
    )
}

const HouseListView = ({data}) => {

    console.log("HOUSE LIST VIEW")

    const [checkboxFilters, setCheckboxFilters] = useState()
    const [areaFilter, setAreaFilter] = useState()

//    useEffect(() => {
//        console.log(checkboxFilters, areaFilter)
//    }, [checkboxFilters, areaFilter])

    return (
        <div>
            <FiltersCollector
                data={data}
                //checkboxFiltersCollector={checkboxFilters => setCheckboxFilters(checkboxFilters)}
                //areaFilterCollector={areaFilter => setAreaFilter(areaFilter)}
                multipleCheckboxFiltersCollector={checkboxFilters => {}}
                booleanCheckboxFiltersCollector={checkboxFilters => {}}
                areaFilterCollector={areaFilter => {}}
            />
            <List
                data={data}
                //checkboxFilters={checkboxFilters}
                //areaFilter={areaFilter}
            />
        </div>
    )
}

