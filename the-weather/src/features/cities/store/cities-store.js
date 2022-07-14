import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {CitiesService} from "../../../common/services";
import {LoadingStatuses} from "../../../common/constants/loading-statuses";

export const fetchCountriesData = createAsyncThunk(
    'cities/fetchCountries',
    async () => {
        return await CitiesService.getCountries();
    }
)

export const fetchCountryInfo = createAsyncThunk(
    'cities/fetchCountryInfo',
    async (isoCode) => {
        return await CitiesService.getCountryInfoByIso(isoCode);
    }
)

export const fetchCitiesData = createAsyncThunk(
    'cities/fetchCitiesData',
    async (isoCode) => {
        return await CitiesService.getCitiesByIso(isoCode);
    }
)

export const citiesStore = createSlice({
    name: 'cities',
    initialState: {
        countries: [],
        countryInfo: null,
        cities: [],
        cityInfo: null,
        error: null,
        loading: LoadingStatuses.IDLE,
        loadingCities: LoadingStatuses.IDLE,
    },
    reducers: {
        setCountries: (state, action) => {
            state.countries = action.payload;
        },
        setCountryInfo: (state, action) => {
            state.countryInfo = action.payload;
        },
        setCities: (state, action) => {
            state.cities = action.payload;
        },
        setCityInfo: (state, action) => {
            state.cityInfo = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCountriesData.fulfilled, (state, action) => {
            state.countries = action.payload;
            state.error = null;
            state.loading = LoadingStatuses.SUCCEEDED;
        }).addCase(fetchCountriesData.pending, (state, action) => {
            state.error = null;
            state.loading = LoadingStatuses.PENDING;
        }).addCase(fetchCountriesData.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = LoadingStatuses.FAILED;
        }).addCase(fetchCountryInfo.fulfilled, (state, action) => {
            state.countryInfo = action.payload;
        }).addCase(fetchCitiesData.fulfilled, (state, action) => {
            state.cities = action.payload;
            state.error = null;
            state.loadingCities = LoadingStatuses.SUCCEEDED;
        })
    }
});

export const { setCountries, setCountryInfo, setCities, setCityInfo, setError } = citiesStore.actions;

export const selectCountries = (state) => state.cities.countries;
export const selectCountryInfo = (state) => state.cities.countryInfo;
export const selectCities = (state) => state.cities.cities;
export const selectCityInfo = (state) => state.cities.cityInfo;
export const selectCityError = (state) => state.cities.error;
export const selectCountryLoading = (state) => state.cities.loading;
export const selectCitiesLoading = (state) => state.cities.loadingCities;

export default citiesStore.reducer;
