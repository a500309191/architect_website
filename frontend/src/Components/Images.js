import React, {useState, useEffect } from "react"
import { makeImageTitles } from "../functions/makeImageTitles"

export const Images = () => {

    let [images, setImages] = useState([])

    useEffect(() => {
        getImages()
    }, [])

    let getImages = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/imagelist/')
        let data = await response.json()
        console.log('IMAGES DATA:', data)
        setImages(data)
    }

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

