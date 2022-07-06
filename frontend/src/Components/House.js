import { useLocation, useParams,  Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { HousesListPage } from "./HousesListPage";
import { Fetch } from "./Fetch";
import { useFetch } from "../hooks/useFetch";
import { useKey } from "../hooks/useKey";
import { useMouse } from "../hooks/useMouse";
import { booleanToText } from "../functions/booleanToText";
import { pluralText } from "../functions/pluralText";


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
        <>
        <div className="house-details">
            <div className="house-model-name">{data.model_name.toUpperCase()}</div>
            <div className="house-common-info">
                <div>AREA: {data.area} m²</div>
                <div>FLOORS: {data.floors}</div>
                <div>MATERIAL: {data.material.toUpperCase()}</div>
            </div>
            <div className="house-composition-title">COMPOSITION:</div>
            <ul className="house-composition-1">
                <li>{data.entrance} ENTRANCE{pluralText(data.entrance).toUpperCase()}</li>
                <li>{data.bedroom} BEDROOM{pluralText(data.bedroom).toUpperCase()}</li>
                <li>{data.bathroom} BATHROOM{pluralText(data.bathroom).toUpperCase()}</li>
                <li>{booleanToText(data.laundry, "laundry")}</li>
                <li>{booleanToText(data.tech_room, "technical room")}</li>
            </ul>
            <ul className="house-composition-2">
                <li>{booleanToText(data.garage, "garage")}</li>
                <li>{booleanToText(data.fireplace, "fireplace")}</li>
                <li>{booleanToText(data.terrace, "terrace")}</li>
                <li>KITCHEN AND LIVING ROOM ARE {data.kitchen_living_room ? "CONNECTED" : "SEPARATED"}</li>
            </ul>
        </div>
        </>
    )
}

const HouseImages = ({data}) => {

    console.log("HouseImages")

    const [viewIndex, setViewIndex] = useState(0)

    const images = data.images
    const plans = data.plans
    const views = [...images, ...plans]

    const prevImage = views => {setViewIndex(prev => prev == 0 ? views.length-1 : prev-1)}
    const nextImage = views => {setViewIndex(prev => prev == views.length-1 ? 0 : prev+1)}

    useKey("ArrowLeft", () => prevImage(views))
    useKey("ArrowRight", () => nextImage(views))
    useMouse(() => nextImage(views), () => prevImage(views))

    const viewCounter = images => {
        return viewIndex >= images.length
            ? `PLAN FLOOR ${viewIndex - images.length + 1}`
            : `IMAGES ${viewIndex+1}/${images.length}`
    }

    return (
        <>
        <div className='house-views'>
            <div className="prev-view" onClick={() => prevImage(views)}></div>
            <div className="next-view" onClick={() => nextImage(views)}></div>
            <div className="house-view-counter">{viewCounter(images)}</div>
            {views.map((view, index) => {
                return (
                    <img
                        src={address + view}
                        alt={`${data.model_name}_view`}
                        key={index}
                        className={`${index === viewIndex
                            ? "house-view-current"
                            : "house-view"}`}
                    />
                )
            })}
        </div>
        <div className="house-views-slider">
            {views.map((view, index) => {
                return (
                    <img
                        className={`${index === viewIndex
                            ? "house-views-slider-view-current"
                            : "house-views-slider-view"}`}
                        src={address + view}
                        key={index}
                        onClick={()=> {
                            setViewIndex(index)
                        }}
                    />
                )
            })}
        </div>
        </>
    )
}
