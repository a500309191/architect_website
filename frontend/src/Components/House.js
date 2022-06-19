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

const HouseDetails = ({data}) => {
    return (
        <div className="house-details">
            <div>{data.model_name}</div>
            <div>{data.area}</div>
            <div>{data.area}</div>
            <div>{data.area}</div>
        </div>
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
            <div className="house-image-counter">IMAGE: {imageIndex+1}/{images.length}</div>
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



//    return (
//        <div className='house-images'>
//            <div className="prev-image" onClick={() => prevImage(images)}></div>
//            <div className="next-image" onClick={() => nextImage(images)}></div>
//            {images.map((image, index) => {
//                return (
//                    <img
//                        src={address + image}
//                        alt={`${data.model_name}_image`}
//                        key={index}
//                        className={`${images.indexOf(image) === imageIndex ? "house-image-current" : "house-image"}`}
//                    />
//                )
//            })}
//        </div>
//    )
//}

//    return (
//        <div className='house-images'>
//            <div className="prev-image" onClick={() => prevImage(images)}></div>
//            <div className="next-image" onClick={() => nextImage(images)}></div>
//            {images.map((image, index) => {
//                return (
//                    <div className="house-image-container"
//                        key={index}
//                    >
//                        <img
//                            src={address + image}
//                            alt={`${data.model_name}_image`}
//                            className={`${images.indexOf(image) === imageIndex ? "house-image-current" : "house-image"}`}
//                        />
//                        <div className="house-image-counter" key={`counter_${index}`}>
//
//                        </div>
//                    </div>
//                )
//            })}
//        </div>
//    )
//}