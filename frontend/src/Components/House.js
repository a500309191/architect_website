import { useLocation, useParams,  Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { HousesList } from "./HousesList";
import { Fetch } from "./Fetch";
import { useFetch } from "../hooks/useFetch";


const address = 'http://127.0.0.1:8000/media/'

export const House = () => {
    const {id} = useParams();

    return (
        <Fetch
            uri = {`http://127.0.0.1:8000/api/house/${id}/`}
            renderSuccess = {HouseView}
        />
    )
}

const HouseView = ({data}) => {
    console.log(data)

    const images = data.images

    return (
        <>
            <h1>{data.model_name}</h1>
            <h1>{data.area}</h1>
            <div className='houseImagesList'>
                {images.map((image, index) => (
                    <div key={index}>
                        <img
                            src={address + image}
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

//                {images.map((image, index) => (
//                    <div key={index}>
//                        <img
//                            src={image.image}
//                            style={{
//                                width: 300
//                            }}
//                        />
//                    </div>
//                ))}