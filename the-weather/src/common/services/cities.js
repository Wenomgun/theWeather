import axios from "axios";

const API_KEY = "";

const instanceAxios = axios.create({
    baseURL: 'https://api.countrystatecity.in/',
    headers: {
        "X-CSCAPI-KEY": API_KEY
    }
});

export const CitiesService = {
    getCountries: () => {
        return instanceAxios.get('v1/countries')
            .then((res) => {
                return res.data;
            })
            .catch((e) => e);
    },
    getCountryInfoByIso: (isoCode) => {
        return instanceAxios.get(`v1/countries/${isoCode}`)
            .then((res) => {
                return res.data;
            })
            .catch((e) => e);
    },
    getCitiesByIso: (isoCode) => {
        return instanceAxios.get(`v1/countries/${isoCode}/states`)
            .then((res) => {
                return res.data;
            })
            .catch((e) => e);
    },
    getCityInfo: (isoCountryCode, isoCityCode) => {
        return instanceAxios.get(`v1/countries/${isoCountryCode}/states/${isoCityCode}`)
            .then((res) => {
                return res.data;
            })
            .catch((e) => e);
    },
}
