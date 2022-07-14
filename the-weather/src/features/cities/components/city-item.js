import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getCitiesData, getCitiesDataByLink, selectCitiesData} from "../store/cities-store";

export const CityItem = ({city}) => {
    // const [search, setSearch] = useState('');
    // const cities = useSelector(selectCitiesData);
    // const dispatch = useDispatch();
    // const [link, setLink] = useState(null);
    //
    // useEffect(() => {
    //     console.log(search)
    //     dispatch(getCitiesData( 1, search));
    // }, [search, dispatch]);
    //
    // useEffect(() => {
    //     if (link) {
    //         dispatch(getCitiesDataByLink(link));
    //     }
    // }, [link, dispatch]);

    return (
        <div style={{display: 'flex', flexDirection: 'column', border: '1px solid grey', padding: '10px', margin: '4px'}}>
            <div>
                <span>Country: {city.country} </span>
                <span>City: {city.name} </span>
                {city.type === 'CITY' && <div>
                    Get the weather
                </div>}
            </div>
        </div>
    )
}
