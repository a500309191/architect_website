import { useLocation, useParams,  Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { HousesList } from "./HousesList";

export const House = () => {

    let {id} = useParams();

    const location = useLocation();
    let [state, setSate] = useState(location.state);

    useEffect(() => {
        setSate(location.state)
        console.log('House - useState')
    }, [state])

    console.log(state);

    return (
        <>
            <div>
                <h1>HOUSE {state.model_name} PAGE</h1>
                <h1>AREA {state.area}</h1>
                {state.images.map((image, index) => (
                    <div key={index}>
                        <img
                            src={image.image}
                            style = {{
                                width: 300
                            }}
                        />
                    </div>
                ))}
            </div>
        </>
    )
}

