import React, {useState, useEffect } from "react"
import { makeImageTitles } from "../functions/makeImageTitles"
import { GetJsonData } from "../functions/GetJsonData"
import { Link, useLocation, Outlet } from "react-router-dom";

export const HousesList = ({images_url, params_url}) => {

    let [houseImages, houseParams] = GetJsonData(images_url, params_url)
    let ImageTitles = makeImageTitles(houseImages)

    return (
        <>
            <div className="houses-list">
                {houseParams.map((house, index) => (
                    <Link to="House" key={index}>
                        <div
                            style = {{
                                width: 320,
                                height: 200,
                                backgroundImage: `url(${ImageTitles[index].image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundColor: 'black'
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

//            <div className="houses-list">
//                {houseParams.map((house, index) => (
//                    <div key={index}>
//                        <img
//                            src={makeImageTitles(houseImages)[index].image}
//                            style = {{ width: '300px'}}
//                        />
//                        {house.model_name} : {house.area}
//                    </div>
//                ))}
//            </div>