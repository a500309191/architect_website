import { useParams } from 'react-router-dom';
import { HouseDetailsBlock } from "./HouseDetailsBlock";
import { HouseViewsBlock } from "./HouseViewsBlock";
import { HouseNotFound } from "./HouseNotFound";
import { Fetch } from "./../../Fetch";


export const HousePage = () => {
    const {model_name} = useParams();
    return (
        <Fetch
            uri = {`/arch/api/houses/${model_name}/`}
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
            <div className="house-page">
                <HouseDetailsBlock data={data} />
                <HouseViewsBlock data={data} />
            </div>
        )
    }
}



