import {configureStore} from "@reduxjs/toolkit";
import weatherReducer from "../features/weather/store/weather-store"
import citiesReducer from "../features/cities/store/cities-store"

export default configureStore({
    reducer: {
        weather: weatherReducer,
        cities: citiesReducer,
    }
})
