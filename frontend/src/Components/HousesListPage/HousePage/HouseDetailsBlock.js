import { booleanToText } from "../functions/booleanToText";
import { pluralText } from "../functions/pluralText";

export const HouseDetailsBlock = ({data}) => {
    return (
        <>
        <div className="house-details">
            <div className="house-model-name">{data.model_name.toUpperCase()}</div>
            <div className="house-common-info">
                <div>AREA: {data.area} m²</div>
                <div>FLOORS: {data.floors}</div>
                <div>MATERIAL: {data.material.toUpperCase()}</div>
            </div>
            <div className="house-composition-title">COMPOSITION:</div>
            <ul className="house-composition-1">
                <li>{data.entrance} ENTRANCE{pluralText(data.entrance).toUpperCase()}</li>
                <li>{data.bedroom} BEDROOM{pluralText(data.bedroom).toUpperCase()}</li>
                <li>{data.bathroom} BATHROOM{pluralText(data.bathroom).toUpperCase()}</li>
                <li>{booleanToText(data.laundry, "laundry")}</li>
                <li>{booleanToText(data.tech_room, "technical room")}</li>
            </ul>
            <ul className="house-composition-2">
                <li>{booleanToText(data.garage, "garage")}</li>
                <li>{booleanToText(data.fireplace, "fireplace")}</li>
                <li>{booleanToText(data.terrace, "terrace")}</li>
                <li>KITCHEN AND LIVING ROOM ARE {data.kitchen_living_room ? "CONNECTED" : "SEPARATED"}</li>
            </ul>
        </div>
        </>
    )
}