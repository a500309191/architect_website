import React, { useState, useEffect } from "react"

export const GetJsonData = (images_url, houses_url) => {
    let [images, setImages] = useState([]);
    let [houses, setHouses] = useState([]);

    useEffect(() => {
        getData()
    }, []);

    let getData = async () => {
        let response1 = await fetch(images_url)
        let images = await response1.json()
        console.log(`IMAGES DATA FROM: ${images_url}`, images)

        let response2 = await fetch(houses_url)
        let houses = await response2.json()
        console.log(`HOUSES DATA FROM: ${houses_url}`, houses)

        setImages(images)
        setHouses(houses)
    }

    let l = []
    l.push(images, houses)
    return l
}
