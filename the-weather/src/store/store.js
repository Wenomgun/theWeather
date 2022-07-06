import {configureStore} from "@reduxjs/toolkit";
import weatherReducer from "../features/counter/weatherSlice"

export default configureStore({
    reducer: {
        weather: weatherReducer
    }
})
