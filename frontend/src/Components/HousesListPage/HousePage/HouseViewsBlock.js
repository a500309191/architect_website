import React, { useState } from "react";
import { useKey } from "../../hooks/useKey";
import { useMouse } from "../../hooks/useMouse";

export const HouseViewsBlock = ({data}) => {

    const [viewIndex, setViewIndex] = useState(0)
    const getImages = data => data.images.map((image, index) => image["original"])
    const images = getImages(data)
    const plans = data.plans
    const views = [...images, ...plans]

    const prevImage = views => {setViewIndex(prev => prev === 0 ? views.length-1 : prev-1)}
    const nextImage = views => {setViewIndex(prev => prev === views.length-1 ? 0 : prev+1)}

    useKey("ArrowLeft", () => prevImage(views))
    useKey("ArrowRight", () => nextImage(views))
    useMouse(() => nextImage(views), () => prevImage(views))

    const viewCounter = images => {
        return viewIndex >= images.length
            ? `PLAN FLOOR ${viewIndex - images.length + 1}`
            : `IMAGES ${viewIndex+1}/${images.length}`
    }

    if (data.images.length === 0) {
        return (
            <div className="house-has-no-views">HOUSE HAS NO VIEWS</div>
        )
    } else {
        return (
            <>
            <div className='house-views'>
                <div className="prev-view" onClick={() => prevImage(views)}></div>
                <div className="next-view" onClick={() => nextImage(views)}></div>
                <div className="house-view-counter">{viewCounter(images)}</div>
                {views.map((view, index) => {
                    return (
                        <img
                            src={view}
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
                        <div className="house-views-slide" key={index}>
                            <img
                                className={`${index === viewIndex
                                    ? "house-views-slide-view-current"
                                    : "house-views-slide-view"}`}
                                src={view}
                                onClick={()=> {
                                    setViewIndex(index)
                                }}
                            />
                            <div
                            className={`${index === viewIndex
                                    ? "house-views-slide-view-underscore-current"
                                    : "house-views-slide-view-underscore"}`}
                            ></div>
                        </div>
                    )
                })}
            </div>
            </>
        )
    }
}