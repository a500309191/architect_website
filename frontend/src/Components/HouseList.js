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


    const garageText = garage => {
        if (garage) return "has a garage"
        else return "no garage"
    }
    const pluralText = item => { if (item>1) return "s" }

    return (
            <div className="houses-list">
                {data.map((house, index) => {

                    let multipleCheckboxFilter = checkboxFilter(house, multipleCheckbox, multipleCheckboxFilterList)
                    let booleanCheckboxFilter = checkboxFilter(house, booleanCheckbox, booleanCheckboxFilterList)

                    if (
                        multipleCheckboxFilter &&
                        booleanCheckboxFilter &&
                        house.area >= area.minArea &&
                        house.area <= area.maxArea
                    ) {
                        return (
                            <Link
                                to={{pathname: `/houses/${index+1}`}}
                                key={index}
                                className="houses-block"
                                style = {{ backgroundImage: `url(${address}${house.images[0]})` }}
                            >
                                <div className="houses-block-name">{house.model_name}</div>
                                <div className="houses-block-details">
                                    <div >{house.area} m²</div>
                                    <div>{house.material}</div>
                                    <div>{house.floors} floor{pluralText(house.floors)}</div>
                                    <div>{house.bedroom} bedroom{pluralText(house.bedroom)}</div>
                                    <div>{house.bathroom} bathroom{pluralText(house.bathroom)}</div>
                                    <div>{garageText(house.garage)}</div>
                                </div>
                            </Link>
                        )
                    }
                })}
            </div>
    )
}
