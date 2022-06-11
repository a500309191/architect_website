import { Link } from "react-router-dom";


const address = 'http://127.0.0.1:8000/media/'

export const HouseList = ({
        data,
        areaFilter,
        multipleCheckboxFilters,
        booleanCheckboxFilters,
    }) => {

    const area = areaFilter ? JSON.parse(areaFilter) : {}
    const multipleCheckbox = multipleCheckboxFilters ? JSON.parse(multipleCheckboxFilters) : {}
    const booleanCheckbox = booleanCheckboxFilters ? JSON.parse(booleanCheckboxFilters) : {}

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

    const checking = (house, multipleCheckboxFilterList) => {
        let paramsValues = []
        for (let i=0; i<multipleCheckboxFilterList.length; i++) {
            let filter = multipleCheckboxFilterList[i]
            let filters = multipleCheckbox[filter]
            let param = house[filter]
            paramsValues.push(filters && filters.includes(param))
        }
        if (paramsValues.includes(false)) { return false }
        else { return true }
    }

    console.log(area)
    console.log(multipleCheckbox)
    console.log(booleanCheckbox)

    return (
        <>
            <div className="houses-list">
                {data.map((house, index) => {
                    console.log(checking(house, multipleCheckboxFilterList))
                    if (checking(house, multipleCheckboxFilterList)) {
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


//    return (
//        <>
//            <div className="houses-list">
//                {data.map((house, index) => {
//                    if (house.area > area.minArea && house.area < area.maxArea) {
//                        return (
//                        <Link
//                            to={{pathname: `house/${index+1}`}}
//                            key={index}
//                        >
//                            <div
//                                style = {{
//                                    width: 320,
//                                    height: 200,
//                                    backgroundImage: `url(${address}${house.images[0]})`,
//                                    backgroundSize: 'cover'
//                                }}
//                            >
//                                <h3>{house.model_name} : {house.area}</h3>
//                            </div>
//                        </Link>
//                        )
//                    }
//                })}
//            </div>
//        </>
//    )
//}