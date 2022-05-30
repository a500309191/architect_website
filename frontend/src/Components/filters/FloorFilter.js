import React, { useState, useEffect } from "react";

export const FloorFilter = ({onChangeFloors}) => {

    const floorsNumber = 5

    const floorsNumberFilter = () => {
        let d = {}
        for (let i =0; i < floorsNumber; i++) {
            d[`${i+1}`] = true;
        }
        //return JSON.stringify(d)
        return d
    }

//    const floorsNumberFilter = () => {
//        let l = []
//        for (let i =0; i < floorsNumber; i++) {
//            l.push({[`${i+1}`]: true})
//        }
//        return l
//    }

    const [floors, setFloors] = useState(floorsNumberFilter())
    console.log(floors)

    useEffect(() => {
        onChangeFloors(JSON.stringify(floors))
    }, [floors])


    return (
        <>
            <div>FLOORS NUMBER FILTER</div>
            <div>
                {Array(floorsNumber).fill("").map((_, i) => {
                    return (
                        <div key={i} style={{ display: "inline-block"}}>
                            <input
                                type="checkbox"
                                defaultChecked
                                onChange = {() => {
                                    setFloors(floors => {
                                        return {
                                            ...floors,
                                            [`${i+1}`]: !floors[`${i+1}`]
                                        }
                                    })
                                }}
                            />
                            <div style={{ marginLeft: "6" }}>{i + 1}</div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}


//                                onChange = {() => {
//                                    setFloors(floors => {
//                                        return {
//                                            ...floors,
//                                            [`${i+1}`]: !floors[`${i+1}`]
//                                        }
//                                    })
//                                }}