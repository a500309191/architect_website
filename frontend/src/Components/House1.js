import { useLocation } from 'react-router-dom';

export const House = (props) => {

    const location = useLocation();
    const state = location.state;
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