import {useDispatch, useSelector} from "react-redux";
import {getWeatherData, selectWeatherData} from "./weatherSlice";
import {useEffect} from "react";

export const WeatherDisplay = () => {
    const weatherData = useSelector(selectWeatherData);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getWeatherData());
    }, [])

    return (<>
        <div>WeatherDisplay</div>
        {!weatherData && <div>Loading...</div>}
        {weatherData && <div>
            <div>{weatherData.name}</div>
            <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                 alt={weatherData.description} />
        </div>}

    </>)
}
