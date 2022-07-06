import axios from "axios";

const instanceAxios = axios.create({
    baseURL: 'http://geodb-free-service.wirefreethought.com/v1/geo/cities'
});

export const CitiesService = {
    getCities: (offset = 0, namePrefix) => {
        return instanceAxios.get(`?limit=5&offset=${offset}${namePrefix ? `&namePrefix=${namePrefix}`: ''}`)
            .then((res) => {
                return res.data;
            })
            .catch((e) => e);
    }
}
