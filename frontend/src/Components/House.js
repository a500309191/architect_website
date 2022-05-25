import { useLocation, useParams,  Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { HousesList } from "./HousesList";
import { getHouseImages } from "../functions/getHouseImages";

export const House = () => {

    let {id} = useParams();

    let house_url = `http://127.0.0.1:8000/api/house/${id}/`
    let houseImages_url = `http://127.0.0.1:8000/api/image/`

    let [house, setHouse] = useState([]);
    let [houseImages, setHouseImages] = useState([]);

    useEffect(() => {
        GetJsonData(house_url, houseImages_url)
        console.log("useEffect_house")
    }, [])

    let GetJsonData = async (house_url, houseImages_url) => {

        let response1 = await fetch(house_url)
        let houseData = await response1.json()
        console.log(`HOUSE ${id} DATA FROM: ${house_url}`, houseData)
        setHouse(houseData)

        let response2 = await fetch(houseImages_url)
        let housesImagesData = await response2.json()
        console.log(`HOUSES IMAGES DATA FROM: ${houseImages_url}`, housesImagesData)
        let houseImages = await getHouseImages(housesImagesData, houseData.id)
        console.log(`HOUSE ${id} IMAGES DATA`, houseImages)
        setHouseImages(houseImages)

    }



    return (
        <>
            <h1>{house.model_name}</h1>
            <h1>{house.area}</h1>
            <div className='houseImagesList'>
                {houseImages.map((image, index) => (
                    <div key={index}>
                        <img
                            src={image.image}
                            style={{
                                width: 300
                            }}
                        />
                    </div>
                ))}
            </div>
        </>
    )
}


//            <div>
//                <h1>HOUSE {state.model_name} PAGE</h1>
//                <h1>AREA {state.area}</h1>
//                {state.images.map((image, index) => (
//                    <div key={index}>
//                        <img
//                            src={image.image}
//                            style = {{
//                                width: 300
//                            }}
//                        />
//                    </div>
//                ))}
//            </div>