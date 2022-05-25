import React, { useState, useEffect } from "react"

export const GetJsonData = async (images_url, houses_url) => {
    let l =  []

    let response1 = await fetch(images_url)
    let images = await response1.json()
    //console.log(`IMAGES DATA FROM: ${images_url}`, images)

    let response2 = await fetch(houses_url)
    let houses = await response2.json()
    //console.log(`HOUSES DATA FROM: ${houses_url}`, houses)

    l.push(images, houses)
    console.log('GetJsonData ', l)
    return l
}
