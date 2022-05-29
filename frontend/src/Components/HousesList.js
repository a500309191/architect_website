import React, {useState, useEffect, useCallback } from "react";
import { useFetch } from "../hooks/useFetch";
import { getHousesAreas } from "../functions/getHousesAreas";
import { Link } from "react-router-dom";
import { House } from "./House";
import { Fetch } from "./Fetch";
import MultiRangeSlider from "./MultiRangeSlider/MultiRangeSlider";
import { Filters } from "./Filters";


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
    console.log("data: ", data)

    return (
        <>
            <Filters data={data}/>
        </>
    )
}

