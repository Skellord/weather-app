import Api from './api';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_GEO_SEARCH, apiConfig, ApiRequest, apiLanguage } from './apiConfig';
import { apiKey } from './apiKey';

export interface GetLocationRequest extends ApiRequest {
    latitude: string;
    longitude: string;
}

export interface LocationResponse {
    Key: string;
    Type: string;
    LocalizedName: string;
    EnglishName: string;
}

class LocationApi extends Api {
    public constructor(config: AxiosRequestConfig) {
        super(config);
    }

    public getLocationRequest(latitude: string, longitude: string) {
        return this.get<LocationResponse>(
            `${API_GEO_SEARCH}${apiKey}&q=${latitude}%2C%20${longitude}&language=${apiLanguage}`,
            apiConfig
        )
            .then((response: AxiosResponse<LocationResponse>) => {
                const { data } = response;
                return data;
            })
            .catch((error: AxiosError) => {
                throw error;
            });
    }
}

const locationApi = new LocationApi(apiConfig);
export default locationApi;
