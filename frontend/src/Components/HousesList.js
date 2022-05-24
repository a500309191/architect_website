import React, {useState, useEffect } from "react";
import { getFirstHouseImages } from "../functions/getFirstHouseImages";
import { getHouseImages } from "../functions/getHouseImages";
import { GetJsonData } from "../functions/GetJsonData";
import { Link, useLocation, Outlet } from "react-router-dom";
import { House } from "./House";

export const HousesList = ({images_url, params_url}) => {

    const [houseImages, houseParams] = GetJsonData(images_url, params_url)
    const ImageTitles = getFirstHouseImages(houseImages)

    return (
        <>
            <div className="houses-list">
                {houseParams.map((house, index) => (
                    <Link
                        to="house"
                        key={index}
                        state={{
                            x: index+1,
                            area: house.area,
                            images: getHouseImages(houseImages, index+1)
                        }}
                    >
                        <div
                            style = {{
                                width: 320,
                                height: 200,
                                backgroundImage: `url(${ImageTitles[index].image})`,
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

//<Link to={`house/${index}`} state={myData} key={index}>