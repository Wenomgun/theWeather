import axios from "axios";

const instanceAxios = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/weather'
});

const KEY = '';

export const WeatherService = {
    getWeatherByCoords: (lat, lon) => {
        return instanceAxios.get(`?lat=${lat}&lon=${lon}&appid=${KEY}`)
            .then((res) => {
                return res.data;
            })
            .catch((e) => e);
    },
}
