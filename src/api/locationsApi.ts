import Api from './api';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { apiConfig, API_LOCATIONS, apiLanguage, API_LOCATIONS_TEXT } from './apiConfig';
import { apiKey } from './apiKey';
import { CitiesResponse, GeoLocationResponse } from '../types/geoPosition.types';

class LocationsApi extends Api {
    public constructor(config: AxiosRequestConfig) {
        super(config);
    }

    public getLocationRequest(latitude: string, longitude: string) {
        return this.get<GeoLocationResponse>(
            `${API_LOCATIONS}?apikey=${apiKey}&q=${latitude}%2C%20${longitude}&language=${apiLanguage}`
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
        return this.get<CitiesResponse>(`${API_LOCATIONS_TEXT}?apikey=${apiKey}&q=${query}&language=${apiLanguage}`)
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
