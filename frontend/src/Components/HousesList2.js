import React, {useState, useEffect } from "react";
import { getFirstHouseImages } from "../functions/getFirstHouseImages";
import { getHouseImages } from "../functions/getHouseImages";

import { Link } from "react-router-dom";
import { House } from "./House";

export const HousesList = ({images_url, houses_url}) => {

    let [images, setImages] = useState([]);
    let [houses, setHouses] = useState([]);

    useEffect(() => {
        console.log("useEffect_1")
        GetJsonData(images_url, houses_url)
        console.log("useEffect_2")
    }, [])

    let GetJsonData = async (images_url, houses_url) => {

        let response1 = await fetch(images_url)
        let imagesData = await response1.json()
        console.log(`IMAGES DATA FROM: ${images_url}`, imagesData)
        setImages(imagesData )

        let response2 = await fetch(houses_url)
        let housesData  = await response2.json()
        console.log(`HOUSES DATA FROM: ${houses_url}`, housesData )
        setHouses(housesData )
    }

    let firstHouseImages = getFirstHouseImages(images);

    return (
        <>
            <div className="houses-list">
                {houses.map((house, index) => (
                    <Link
                        to={{
                            pathname: `house/${index+1}`
                        }}
                        key={index}
                        state={{
                            model_name: house.model_name,
                            area: house.area,
                            images: getHouseImages(images, index+1)
                        }}
                    >
                        <div
                            style = {{
                                width: 320,
                                height: 200,
                                backgroundImage: `url(${firstHouseImages[index].image})`,
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
