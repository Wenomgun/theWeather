import {useDispatch, useSelector} from "react-redux";
import {getCitiesData, selectCitiesData} from "../features/cities/store/cities-store";
import {useEffect} from "react";

export const CitiesListPage = () => {
    const cities = useSelector(selectCitiesData);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCitiesData( 1));
    }, []);

    return (
        <div>
            {!cities && <div>Loading...</div>}
            {cities && cities.data.map((city) => {
                return (
                    <div key={city.id}>{city.name}</div>
                )
            })}
        </div>
    )
}
