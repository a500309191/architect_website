import React, { useEffect, useRef } from "react";

export const useKey = (key, cb) => {
    useEffect(() => {
        const handle = e => { if (e.key === key) { cb(e) } }
        document.addEventListener("keydown", handle, false)
        return () => document.removeEventListener("keydown", handle, false)
    }, [key])
}


//export const useKey = (key, cb) => {
//
//    const callbackRef = useRef(cb)
//
//    useEffect(() => {
//        callbackRef.current = cb
//    })
//
//    useEffect(() => {
//        const handle = e => {
//            if (e.key === key) {
//                callbackRef.current(e)
//            }
//        }
//        document.addEventListener("keydown", handle, false)
//        return () => document.removeEventListener("keydown", handle, false)
//    }, [key])
//}