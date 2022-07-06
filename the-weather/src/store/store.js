import {configureStore} from "@reduxjs/toolkit";
import weatherReducer from "../features/counter/weatherSlice"
import citiesReducer from "../features/cities/store/cities-store"

export default configureStore({
    reducer: {
        weather: weatherReducer,
        cities: citiesReducer,
    }
})
