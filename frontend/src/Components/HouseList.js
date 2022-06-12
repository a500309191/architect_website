import "./HouseList.css";
import { Link } from "react-router-dom";
import { checkboxFilter } from "./filters/functions/checkboxFilter";


const address = 'http://127.0.0.1:8000/media/'

export const HouseList = ({
        data,
        areaFilter,
        multipleCheckboxFilters,
        booleanCheckboxFilters,
        multipleCheckboxFilterList,
        booleanCheckboxFilterList,
    }) => {

    const area = areaFilter ? JSON.parse(areaFilter) : {}
    const multipleCheckbox = multipleCheckboxFilters ? JSON.parse(multipleCheckboxFilters) : {}
    const booleanCheckbox = booleanCheckboxFilters ? JSON.parse(booleanCheckboxFilters) : {}
    console.log(area)
    console.log(multipleCheckbox)
    console.log(booleanCheckbox)


    return (
        <>
            <div className="houses-list">
                {data.map((house, index) => {

                    let multipleCheckboxFilter = checkboxFilter(house, multipleCheckbox, multipleCheckboxFilterList)
                    let booleanCheckboxFilter = checkboxFilter(house, booleanCheckbox, booleanCheckboxFilterList)

                    if (
                        multipleCheckboxFilter &&
                        booleanCheckboxFilter &&
                        house.area > area.minArea &&
                        house.area < area.maxArea
                    ) {
                        return (
                            <Link
                                to={{pathname: `house/${index+1}`}}
                                key={index}
                            >
                                <div
                                    className="house-block"
                                    style = {{
                                        width: 320,
                                        height: 200,
                                        backgroundImage: `url(${address}${house.images[0]})`,
                                        backgroundSize: 'cover'
                                    }}
                                >
                                    <h3 className="house-block-text">{house.model_name} : {house.area}</h3>
                                </div>
                            </Link>
                        )
                    }
                })}
            </div>
        </>
    )
}
