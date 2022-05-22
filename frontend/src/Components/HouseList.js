import React, {useState, useEffect } from "react"

export const HouseList = () => {

    let [houses, setHouses] = useState([])

    useEffect(() => {
        getHouses()
    }, [])

    let getHouses = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/houselist/')
        //Why json data need convert to .json again? 
        let data = await response.json()
        console.log('HOUSES DATA:', data)
        setHouses(data)
    }

    return (
        <>
            <div className="houses-list">
                {houses.map((house, index) => (
                    <div key={index}>
                        {house.model_name} : {house.area} sq.m.
                    </div>
                ))}
            </div>
        </>
    )
}