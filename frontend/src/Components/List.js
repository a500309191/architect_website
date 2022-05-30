import { Link } from "react-router-dom";


const address = 'http://127.0.0.1:8000/media/'

export const List = ({
        data,
        minAreaValue,
        maxAreaValue,
    }) => {
    return (
        <>
            <div className="houses-list">
                {data.map((house, index) => {
                    if (house.area > minAreaValue && house.area < maxAreaValue) {
                        return (
                        <Link
                            to={{pathname: `house/${index+1}`}}
                            key={index}
                        >
                            <div
                                style = {{
                                    width: 320,
                                    height: 200,
                                    backgroundImage: `url(${address}${house.images[0]})`,
                                    backgroundSize: 'cover'
                                }}
                            >
                                <h3>{house.model_name} : {house.area}</h3>
                            </div>
                        </Link>
                        )
                    }
                })}
            </div>
        </>
    )
}