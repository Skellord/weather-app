import Api from './api';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { apiConfig, API_LOCATIONS, apiLanguage, API_LOCATIONS_TEXT } from './apiConfig';
import { apiKey } from './apiKey';
import { CitiesResponse, GeoLocationCityResponse, GeoLocationResponse } from '../types/geoPosition.types';

const locationsApiConfig: AxiosRequestConfig = {
    baseURL: 'http://dataservice.accuweather.com/',
};

class LocationsApi extends Api {
    public constructor(config: AxiosRequestConfig) {
        super(config);
    }

    public getLocationRequest(latitude: string, longitude: string) {
        return this.get<GeoLocationResponse>(
            `${API_LOCATIONS}?apikey=${apiKey}&q=${latitude}%2C%20${longitude}&language=${apiLanguage}`,
            locationsApiConfig
        )
            .then((response: AxiosResponse<GeoLocationResponse>) => {
                const { data } = response;
                return data;
            })
            .catch((error: AxiosError) => {
                throw error;
            });
    }

    public fetchCitiesQueries(query: string) {
        return this.get<CitiesResponse>(
            `${API_LOCATIONS_TEXT}?apikey=${apiKey}&q=${query}&language=${apiLanguage}`,
            locationsApiConfig
        )
            .then((response: AxiosResponse<CitiesResponse>) => {
                const { data } = response;
                return data;
            })
            .catch((error: AxiosError) => {
                throw error;
            });
    }
}

const locationsApi = new LocationsApi(apiConfig);
export default locationsApi;
