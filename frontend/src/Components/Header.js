import React from 'react';
import { NavLink } from "react-router-dom";

export const Header = () => {
    return (
        <>
            <NavLink className="header-main" to="/">MAIN</NavLink>
            <NavLink className="header-houses" to="/houses">HOUSES</NavLink>
            <NavLink className="header-about" to="/about">ABOUT</NavLink>
        </>
    )
}


//        <>
//            <div className="header-main"><NavLink to="/">MAIN</NavLink></div>
//            <div className="header-houses" ><NavLink to="/houses">HOUSES</NavLink></div>
//            <div className="header-about"><NavLink to="/about">ABOUT</NavLink></div>
//        </>