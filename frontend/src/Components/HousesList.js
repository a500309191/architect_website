import React, {useState, useEffect, useCallback } from "react";
import { useFetch } from "../hooks/useFetch";
import { Fetch } from "./Fetch";
import { FiltersCollector } from "./FiltersCollector";
import { List } from "./List";


const address = 'http://127.0.0.1:8000/media/'

export const HousesList = () => {
    return (
        <Fetch
            uri = 'http://127.0.0.1:8000/api/house/'
            renderSuccess = {HouseListView}
        />
    )
}


const HouseListView = ({data}) => {
    console.log("HouseListView")
    console.log("data: ", data)

    return (
        <>
            <FiltersCollector data={data}/>
            <List
                data={data}
            />
        </>
    )
}

