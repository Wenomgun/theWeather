import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {
    fetchCitiesData,
    fetchCountriesData,
    fetchCountryInfo, selectCities,
    selectCitiesLoading,
    selectCountries,
    selectCountryInfo, selectCountryLoading
} from "../store/cities-store";
import useDebounce from "../../../common/hooks/useDebounce";
import {fetchWeatherData} from "../../weather/store/weather-store";
import {LoadingStatuses} from "../../../common/constants/loading-statuses";
import {Loader} from "../../../components";
import {Input, List} from 'antd';

export const CitiesList = () => {
    const [search, setSearch] = useState('');
    const [searchCity, setSearchCity] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const isLoading = useSelector(selectCountryLoading);
    const isLoadingCities = useSelector(selectCitiesLoading);
    const countries = useSelector(selectCountries);
    const selectedCountryInfo = useSelector(selectCountryInfo);
    const cities = useSelector(selectCities);
    const dispatch = useDispatch();

    const debouncedSearchTerm = useDebounce(search, 500);
    const debouncedSearchCityTerm = useDebounce(searchCity, 500);

    const showLoader = () => {
        return isLoading === LoadingStatuses.PENDING;
    }

    const showLoaderCities = () => {
        return isLoadingCities === LoadingStatuses.PENDING;
    }

    const chooseCountry = (id) => {
        setSelectedCountry(id);
    }

    const chooseCity = (id) => {
        setSelectedCity(id);
    }

    const getFilteredCountries = () => {
        if(!debouncedSearchTerm.trim()) {
           return countries;
        }
        return countries.filter(country => country.name.toLowerCase().indexOf(debouncedSearchTerm.toLowerCase()) !== -1);
    }

    const getFilteredCities = () => {
        if(!debouncedSearchCityTerm.trim()) {
            return cities;
        }
        return cities.filter(city => city.name.toLowerCase().indexOf(debouncedSearchCityTerm.toLowerCase()) !== -1);
    }

    const changeSearchHandler = (e) => {
        setSearch(e.target.value);
    }

    const changeSearchCityHandler = (e) => {
        setSearchCity(e.target.value);
    }

    useEffect(() => {
        dispatch(fetchWeatherData({
            lat: '55.88333000',
            lon: '37.58333000',
        }));
        dispatch(fetchCountriesData())
    }, []);

    useEffect(() => {
        if (selectedCountry) {
            dispatch(fetchCountryInfo(selectedCountry));
            dispatch(fetchCitiesData(selectedCountry));
        }
    }, [selectedCountry]);

    return (
        <div className="countriesList">
            <div style={{width: '30%'}}>
                <div className="countriesList-wrapper-search">
                    <Input
                        placeholder="Search countries"
                        onChange={changeSearchHandler}
                        style={{
                            width: 300,
                        }}
                        disabled={showLoader()}
                    />
                </div>
                {showLoader() ?
                    <Loader/> :
                    <div className="countriesList-wrapper-list">
                        <List
                            style={{maxWidth: '300px'}}
                            dataSource={getFilteredCountries()}
                            renderItem={item => (
                                <List.Item className={`countriesList-item ${item.iso2 === selectedCountry && 'selected'}`}
                                           onClick={() => {chooseCountry(item.iso2)}}>
                                    <div>{item.name}</div>
                                </List.Item>
                            )}
                        />
                    </div>
                }
            </div>
            <div style={{width: '30%'}}>
                <div className="countriesList-wrapper-search">
                    <Input
                        placeholder="Search countries"
                        onChange={changeSearchCityHandler}
                        style={{
                            width: 300,
                        }}
                        disabled={showLoaderCities()}
                    />
                </div>
                {showLoaderCities() ?
                    <Loader/> :
                    <div className="countriesList-wrapper-list">
                        <List
                            style={{maxWidth: '300px'}}
                            dataSource={getFilteredCities()}
                            renderItem={item => (
                                <List.Item className={`countriesList-item ${item.iso2 === selectedCity && 'selected'}`}
                                           onClick={() => {chooseCity(item.iso2)}}>
                                    <div>{item.name}</div>
                                </List.Item>
                            )}
                        />
                    </div>
                }
            </div>
            <div style={{width: '30%'}}>
                {selectedCountryInfo && <div className="countriesList-info">
                    <div><b>Country:</b> {selectedCountryInfo.name}({selectedCountryInfo.emoji})</div>
                    <div><b>Region:</b> {selectedCountryInfo.region}</div>
                    <div><b>Capital:</b> {selectedCountryInfo.capital}</div>
                    <div><b>Currency:</b> {selectedCountryInfo.currency_name}({selectedCountryInfo.currency_symbol})</div>
                </div>}
            </div>
        </div>
    )
}
