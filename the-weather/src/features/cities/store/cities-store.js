import { createSlice } from '@reduxjs/toolkit'
import {CitiesService} from "../../../common/services/cities";

export const citiesStore = createSlice({
    name: 'cities',
    initialState: {
        value: null,
        totalCount: 0,
        currentOffset: 0,
        error: null,
    },
    reducers: {
        setCitiesData: (state, action) => {
            state.value = action.payload;
        },
        setTotalCount: (state, action) => {
            state.totalCount = action.payload;
        },
        setCurrentOffset: (state, action) => {
            state.currentOffset = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    }
});

export const { setCitiesData, setTotalCount, setCurrentOffset, setError } = citiesStore.actions;

export const getCitiesData = (offset, name) => (dispatch) => {
    CitiesService.getCities(offset, name)
        .then((data) => {
            dispatch(setCitiesData(data));
            dispatch(setCurrentOffset(data.metadata.currentOffset));
            dispatch(setTotalCount(data.metadata.totalCount));
        }).catch(e => dispatch(setError(e)));
}

export const selectCitiesData = (state) => state.cities.value;
export const selectCitiesTotalCount = (state) => state.cities.totalCount;

export default citiesStore.reducer;
