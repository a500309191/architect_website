import React, { useState, useEffect, useRef, useMemo } from "react";
import { MultipleCheckboxFilter } from "./filters/templates/MultipleCheckboxFilter";
import { SingleCheckboxFilters } from "./filters/templates/SingleCheckboxFilters";
import { AreaFilter } from "./filters/AreaFilter";


export const FiltersCollector = ({data}) => {

    const [area, setArea] = useState()
    const [floors, setFloors] = useState()
    const [material, setMaterial] = useState()
    const [roof, setRoof] = useState()
    const [size, setSize] = useState()
    const [style, setStyle] = useState()
    const [bedroom, setBedroom] = useState()
    const [bathroom, setBathroom] = useState()
    const [entrance, setEntrance] = useState()
    const [booleanFilters, setBooleanFilters] = useState()

    const [filters, setFilters] = useState()

    const multipleCheckboxFilterList = [
        "floors",
        "material",
        "roof",
        "size",
        "style",
        "bedroom",
        "bathroom",
        "entrance",
    ]

    useEffect(() => {
        setFilters({
            "area":area,
            "floors":floors,
            "material":material,
            "roof":roof,
            "size":size,
            "style":style,
            "bedroom":bedroom,
            "bathroom":bathroom,
            "entrance":entrance,
            "booleanFilters":booleanFilters,
        })
        console.log(filters)
    }, [
        area,
        floors,
        material,
        roof,
        size,
        style,
        bedroom,
        bathroom,
        entrance,
        booleanFilters,
    ])


    //some styles
    const checkboxStyle = { display: "block" }
    const textStyle = { marginLeft: "5" }
    const countStyle = { opacity: "0.5", marginLeft: "5" }
    const filter_style = { margin: "5", backgroundColor: "#CFD1E1"}

    return (
        <>
            <div>
                <AreaFilter
                    data={data}
                    onChange={ e => setArea(e)}
                />
            </div>

            <div className="multipleCheckboxFilter">
                {multipleCheckboxFilterList.map((filterType, index) => {
                    return (
                        <div style={filter_style}key={index}>
                            <MultipleCheckboxFilter
                                data={data}
                                filterType={filterType}
                                onChange={e => {
                                    if (filterType=="floors") {setFloors(e)}
                                    if (filterType=="material") {setMaterial(e)}
                                    if (filterType=="roof") {setRoof(e)}
                                    if (filterType=="size") {setSize(e)}
                                    if (filterType=="style") {setStyle(e)}
                                    if (filterType=="bedroom") {setBedroom(e)}
                                    if (filterType=="bathroom") {setBathroom(e)}
                                    if (filterType=="entrance") {setEntrance(e)}
                                }}
                                checkboxStyle={checkboxStyle}
                                textStyle={textStyle}
                                countStyle={countStyle}
                            />
                        </div>
                )})}
            </div>

            <div>
                <SingleCheckboxFilters
                    data={data}
                    checkboxStyle={checkboxStyle}
                    onChange={e => setBooleanFilters(e)}
                    header="BOLEEAN FILTERS"
                    textStyle={textStyle}
                    countStyle={countStyle}
                    filter_style={filter_style}
                />
            </div>

            <div style = {{ margin: "10", marginLeft: "0"}}>
                <pre>{JSON.stringify(filters, null, 2)}</pre>
            </div>
        </>
    )
}
