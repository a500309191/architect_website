import React, { useState, useEffect } from "react"
import { makeImageTitles } from "../functions/makeImageTitles"
import { GetJsonData } from "../functions/GetJsonData"

export const Images = ({url}) => {

    let images = GetJsonData(url)

    // func takes only the first image in the list of images of one house
    let imageTitles = makeImageTitles(images)

    return (
        <>
            <div className="images">
                {imageTitles.map((image, index) => (
                    <div key={index}>
                        {image.house}
                        <img
                            src={image.image}
                            style={{ width: '200px' }}
                        />
                    </div>
                ))}
            </div>
        </>
    )
}

