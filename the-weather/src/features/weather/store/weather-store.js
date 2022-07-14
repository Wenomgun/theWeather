import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {WeatherService} from "../../../common/services";
import {LoadingStatuses} from "../../../common/constants/loading-statuses";

export const fetchWeatherData = createAsyncThunk(
    'weather/fetchWeatherData',
    async ({lat, lon}) => {
        return await WeatherService.getWeatherByCoords(lat, lon);
    }
)

export const weatherStore = createSlice({
    name: 'weather',
    initialState: {
        value: null,
        error: null,
        loading: LoadingStatuses.IDLE
    },
    reducers: {
        setWeatherData: (state, action) => {
            state.value = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchWeatherData.fulfilled, (state, action) => {
            state.value = action.payload;
        })
    }
});

export const { setWeatherData, setError } = weatherStore.actions;

export const selectWeatherData = (state) => state.weather.value;

export default weatherStore.reducer;
