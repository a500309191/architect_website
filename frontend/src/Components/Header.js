import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { NavLink } from "react-router-dom";

export const Header = () => {

    const location = useLocation()
    const locationArray = location.pathname.split('/')
    const checkIsHousePage = () => {
        return locationArray[locationArray.length - 2] == "houses" ? true : false
    }

    return (
        <>
            <NavLink
                className="header-main"
                to="/"
            >
                MAIN
            </NavLink>
            <NavLink
                className={`${checkIsHousePage() ? "header-back-to-houses" : "header-houses"}`}
                to="/houses"
            >
                {`${checkIsHousePage() ? "BACK TO HOUSES" : "HOUSES"}`}
            </NavLink>
        </>
    )
}