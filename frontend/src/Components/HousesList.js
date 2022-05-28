import React, {useState, useEffect, useCallback } from "react";
import { useFetch } from "../hooks/useFetch";
import { getHousesAreas } from "../functions/getHousesAreas";
import { Link } from "react-router-dom";
import { House } from "./House";
import { Fetch } from "./Fetch";
import MultiRangeSlider from "./MultiRangeSlider/MultiRangeSlider";
import { AreaFilter } from "./AreaFilter";


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
            <AreaFilter data={data}/>

            <div className="houses-list">
                {data.map((house, index) => (
                    <Link
                        to={{pathname: `house/${index+1}`}}
                        key={index}
                    >
                        <div
                            style = {{
                                width: 320,
                                height: 200,
                                backgroundImage: `url(${address}${house.images[0]})`,
                                backgroundSize: 'cover'
                            }}
                        >
                            <h3>{house.model_name} : {house.area}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
}


