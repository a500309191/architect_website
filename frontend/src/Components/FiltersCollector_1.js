import React, { useState, useEffect, useRef, useMemo } from "react";
import { AreaFilter } from "./filters/AreaFilter";
import { FloorsFilter } from "./filters/FloorsFilter";
import { MaterialFilter } from "./filters/MaterialFilter";
import { RoofFilter } from "./filters/RoofFilter";
import { SizeFilter } from "./filters/SizeFilter";
import { StyleFilter } from "./filters/StyleFilter";

export const FiltersCollector = ({data}) => {

    const [area, setArea] = useState()
    const [floors, setFloors] = useState()
    const [material, setMaterial] = useState()
    const [roof, setRoof] = useState()
    const [size, setSize] = useState()
    const [style, setStyle] = useState()

    const [filters, setFilters] = useState()

    useEffect(() => {
        setFilters({
            "floors":floors,
            "material":material,
            "roof":roof,
            "size":size,
            "style":style,
        })
        console.log(filters)
    }, [floors, material, roof, size, style])


    useEffect(() => {
        console.log(
            area, "\n",
            floors, "\n",
            material, "\n",
            roof, "\n",
            size, "\n",
        )
    }, [area, floors, material, roof, size, style])



    let style_ = { margin: "2" }
    let filter_style = {
        margin: "5",
        backgroundColor: "#CFD1E1",
    }

    return (
        <div>
            <div>
                <AreaFilter
                    data={data}
                    onChange={ e => setArea(e)}
                />
            </div>
            <div style={filter_style}>
                <FloorsFilter
                    data={data}
                    onChange={e => setFloors(e)}
                    filterType="floors"
                />
            </div>
            <div style={filter_style}>
                <MaterialFilter
                    data={data}
                    onChange={e => setMaterial(e)}
                    filterType="material"
                />
            </div>
            <div style={filter_style}>
                <RoofFilter
                    data={data}
                    onChange={e => setRoof(e)}
                    filterType="roof"
                />
            </div>
            <div style={filter_style}>
                <SizeFilter
                    data={data}
                    onChange={e => setSize(e)}
                    filterType="size"
                />
            </div>
            <div style={filter_style}>
                <StyleFilter
                    data={data}
                    onChange={e => setStyle(e)}
                    filterType="style"
                />
            </div>

            <div style = {{ margin: "10", marginLeft: "0"}}>
                <h3 style={style_}>{JSON.stringify(filters)}</h3>

            </div>
        </div>
    )
}

//                <h3 style={style_}>{area}</h3>
//                <h3 style={style_}>{floors}</h3>
//                <h3 style={style_}>{material}</h3>
//                <h3 style={style_}>{roof}</h3>
//                <h3 style={style_}>{size}</h3>
//                <h3 style={style_}>{style}</h3>