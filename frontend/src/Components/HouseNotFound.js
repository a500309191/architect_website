import { useParams } from 'react-router-dom';

export const HouseNotFound = () => {
    const {model_name} = useParams();
    return (
        <div className="house-not-found">
            THERE IS NO HOUSE {model_name.toUpperCase()}
        </div>
    )
}