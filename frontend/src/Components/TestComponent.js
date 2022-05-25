import React, { useState, useEffect } from "react"

export const TestComponent = () => {
    let [a, setA] = useState([]);

    useEffect(() => {
        console.log("useEffect works!")
        test_func()
    }, [])

    let test_func = () => {
        setA([['1','2','3'], ['a','b','c']])
    }

    let [test1, test2] = a

    return (
        <>
            <h1>{test1}</h1>
            <h1>{test2}</h1>
        </>
    )
}