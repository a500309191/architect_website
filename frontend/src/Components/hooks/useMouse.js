import { useEffect } from "react";
/*import React, { useEffect, useRef } from "react";*/

export const useMouse = (scrollUp, scrollDown) => {

    useEffect(() => {
        const handle = e => {
            let scrollDirection
            let wheelData = e.wheelDelta
            wheelData ? scrollDirection = wheelData : scrollDirection = -1 * e.detail
            scrollDirection > 0 ? scrollUp() : scrollDown()
        }

        document.addEventListener("mousewheel", handle, false)
        return () => document.removeEventListener("mousewheel", handle, false)
    })
}


//export const useMouse = (scrollUp, scrollDown) => {
//
//    useEffect(() => {
//          const handle = e => {
//              let scrollDirection
//              let wheelData = e.wheelDelta
//
//              if (wheelData) { scrollDirection = wheelData }
//              else { scrollDirection = -1 * e.detail }
//
//              if (scrollDirection > 0) { scrollUp(e) }
//              else { scrollDown(e) }
//          }
//
//        document.addEventListener("mousewheel", handle, false)
//        return () => document.removeEventListener("mousewheel", handle, false)
//
//    }, [scrollUp, scrollDown])
//}