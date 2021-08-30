import { AxiosProxyConfig, AxiosRequestConfig } from 'axios';

export const API_GEO_SEARCH = '/locations/v1/cities/geoposition/search?apikey=';

export const apiLanguage = 'ru-ru';

export interface ApiRequest {
    apiKey: string;
}

const headers = {
    common: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
};

export const apiConfig: AxiosRequestConfig = {
    timeout: 60 * 5 * 1000 /* timeout 5 минут */,
    baseURL: 'https://cors-anywhere.herokuapp.com/http://dataservice.accuweather.com',
    headers,
};
