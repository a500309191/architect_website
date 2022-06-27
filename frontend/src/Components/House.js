import { useLocation, useParams,  Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { HousesListPage } from "./HousesListPage";
import { Fetch } from "./Fetch";
import { useFetch } from "../hooks/useFetch";
import { useKey } from "../hooks/useKey";
import { useMouse } from "../hooks/useMouse";

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
    return (
        <div className="house">
            <HouseDetails data={data} />
            <HouseImages data={data} />
        </div>
    )
}

//entrance: 4
//fireplace: false
//garage: false
//kitchen_living_room: true
//laundry: true
//tech_room: true
//terrace т

const HouseDetails = ({data}) => {
    return (
        <>
        <div className="house-details">
            <div className="house-model-name">{data.model_name}</div>

            <div>{data.size}</div>
            <div>{data.area}</div>
            <div>{data.floors}</div>
            <div>{data.material}</div>
            <div>{data.bedroom}</div>
            <div>{data.bathroom}</div>

            <div>{data.entrance}</div>
            <div>{data.fireplace}</div>
            <div>{data.garage}</div>
            <div>{data.kitchen_living_room}</div>
            <div>{data.laundry}</div>
            <div>{data.tech_room}</div>
            <div>{data.terrace}</div>
        </div>
        </>
    )
}

const HouseImages = ({data}) => {

    console.log("HouseImages")

    const [imageIndex, setImageIndex] = useState(0)
    const images = data.images

    const prevImage = images => {setImageIndex(prev => prev == 0 ? images.length-1 : prev-1)}
    const nextImage = images => {setImageIndex(prev => prev == images.length-1 ? 0 : prev+1)}

    useKey("ArrowLeft", () => prevImage(images))
    useKey("ArrowRight", () => nextImage(images))
    useMouse(() => nextImage(images), () => prevImage(images))

    const x = useRef(null)

    return (
        <div className='house-images'>
            <div className="prev-image" onClick={() => prevImage(images)}></div>
            <div className="next-image" onClick={() => nextImage(images)}></div>
            <div className="house-image-counter">IMAGE {imageIndex+1}/{images.length}</div>
            {images.map((image, index) => {
                return (
                    <img
                        src={address + image}
                        alt={`${data.model_name}_image`}
                        key={index}
                        className={`${images.indexOf(image) === imageIndex ? "house-image-current" : "house-image"}`}
                    />
                )
            })}
        </div>
    )
}


//        <div className="house-details">
//            <div className="house-model-name">{data.model_name}</div>
//
//            <div>{data.size}</div>
//            <div>{data.area}</div>
//            <div>{data.floors}</div>
//            <div>{data.material}</div>
//            <div>{data.style}</div>
//            <div>{data.roof}</div>
//            <div>{data.bedroom}</div>
//            <div>{data.bathroom}</div>
//
//            <div>{data.entrance}</div>
//            <div>{data.fireplace}</div>
//            <div>{data.garage}</div>
//            <div>{data.kitchen_living_room}</div>
//            <div>{data.laundry}</div>
//            <div>{data.tech_room}</div>
//            <div>{data.terrace}</div>
//        </div>