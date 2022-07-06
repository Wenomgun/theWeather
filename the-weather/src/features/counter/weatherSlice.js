import { createSlice } from '@reduxjs/toolkit'

export const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        value: null,
    },
    reducers: {
        setWeatherData: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { setWeatherData } = weatherSlice.actions;

export const getWeatherData = () => (dispatch) => {
    const zip = '94303';
    const URL = "http://api.openweathermap.org/data/2.5/weather?q=" + zip +
        "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial";
    fetch(URL)
        .then((res) => {
            return res.json();
        })
        .then((weatherData) => {
            dispatch(setWeatherData(weatherData))
        })
}

export const selectWeatherData = (state) => state.weather.value;

export default weatherSlice.reducer;
