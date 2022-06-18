import { useLocation, useParams,  Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { HousesListPage } from "./HousesListPage";
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
        </div>
    )
}

const HouseImages = ({data}) => {

    const [imageIndex, setImageIndex] = useState(0)
    const images = data.images


    const nextImage = images => {
        setImageIndex(prev => prev == images.length-1 ? 0 : prev+1)
    }
    const prevImage = images => {
        setImageIndex(prev => prev == 0 ? images.length-1 : prev-1)
    }

    const test = () => {
        let x
        setTimeout(x => x = "house-image-current", 500)
        return x
    }

    return (
        <div className='house-images'>
            <img className="house-image" alt={`${data.model_name}_image`} src={address + images[imageIndex]} />
            <div className="prev-image" onClick={() => prevImage(images)}></div>
            <div className="next-image" onClick={() => nextImage(images)}></div>
        </div>
    )
}

//    return (
//        <div className='house-images'>
//            <div className="prev-image" onClick={() => prevImage(images)}></div>
//            <div className="next-image" onClick={() => nextImage(images)}></div>
//            {images.map((image, index) => {
//                return (
//                    <div
//                        className={index == imageIndex ? "house-slide-current" : "house-slide"}
//                        key={index}
//                    >
//                        {index == imageIndex && (
//                            <img
//                                className="house-image"
//                                src={address + image}
//                                alt={`${data.model_name}_image`}
//                            />
//                        )}
//                    </div>
//                )
//            })}
//        </div>
//    )
//}

//    return (
//        <div className='house-images'>
//            <img className="house-image" alt={`${data.model_name}_image`} src={address + images[imageIndex]} />
//            <div className="prev-image" onClick={() => prevImage(images)}></div>
//            <div className="next-image" onClick={() => nextImage(images)}></div>
//        </div>
//    )
//}


//    return (
//        <div className='house-images'>
//            <img
//                className={images.indexOf(images[imageIndex]) == imageIndex
//                    ? "house-image-current"
//                    : "house-image"
//                    }
//                alt={`${data.model_name}_image`}
//                src={address + images[imageIndex]}
//            />
//            <div className="prev-image" onClick={() => prevImage(images)}></div>
//            <div className="next-image" onClick={() => nextImage(images)}></div>
//        </div>
//    )
//}