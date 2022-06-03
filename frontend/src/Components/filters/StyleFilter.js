import React, { useState, useEffect, useCallback } from "react";
import { MultipleCheckboxFilterTemplate } from "./templates/MultipleCheckboxFilterTemplate";


export const StyleFilter = ({data, onChange, filterType}) => {

    const checkboxStyle = { display: "block" }
    const textStyle = { marginLeft: "5" }
    const countStyle = { opacity: "0.5", marginLeft: "5" }

    console.log("style filter")

    return (
        <div>
            <MultipleCheckboxFilterTemplate
                data={data}
                filterType={filterType}
                onChange={onChange}
                checkboxStyle={checkboxStyle}
                textStyle={textStyle}
                countStyle={countStyle}
            />
        </div>
    )
}