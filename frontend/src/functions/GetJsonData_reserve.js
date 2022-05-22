import React, { useState, useEffect } from "react"

export const GetJsonData = (url) => {

    let [data, setData] = useState([])

    useEffect(() => {
        getData()
    }, [])

    let getData = async () => {
        let response = await fetch(url)
        let data = await response.json()
        console.log(`DATA FROM: ${url}`, data)
        setData(data)
    }

    return data
}
