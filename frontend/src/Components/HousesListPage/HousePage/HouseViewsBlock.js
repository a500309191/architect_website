import React, { useState } from "react";
import { useKey } from "../../hooks/useKey";
import { useMouse } from "../../hooks/useMouse";

const address = 'http://127.0.0.1:8000/media/'

export const HouseViewsBlock = ({data}) => {

    console.log("HouseViews")

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
                    <div>
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
                        <div
                        className={`${index === viewIndex
                                ? "house-views-slider-view-underscore-current"
                                : "house-views-slider-view-underscore"}`}
                        ></div>
                    </div>
                )
            })}
        </div>
        </>
    )
}