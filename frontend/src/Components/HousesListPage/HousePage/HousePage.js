import { useLocation, useParams } from 'react-router-dom';
import { HouseDetailsBlock } from "./HouseDetailsBlock";
import { HouseViewsBlock } from "./HouseViewsBlock";
import { HouseNotFound } from "./HouseNotFound";
import { Fetch } from "./../../Fetch";
import { useFetch } from "../../hooks/useFetch";

const address = 'http://127.0.0.1:8000/media/'

export const HousePage = () => {
    const {model_name} = useParams();
    return (
        <Fetch
            uri = {`http://127.0.0.1:8000/api/houses/${model_name}/`}
            renderSuccess = {HouseView}
        />
    )
}

const HouseView = ({data}) => {
    console.log(data)

    if (data.detail === "Not found.") {
        return (
            <HouseNotFound />
        )
    } else {
        return (
            <div className="house">
                <HouseDetailsBlock data={data} />
                <HouseViewsBlock data={data} />
            </div>
        )
    }
}



