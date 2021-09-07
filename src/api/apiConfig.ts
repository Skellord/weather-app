import { AxiosRequestConfig } from 'axios';

export const API_CONDITIONS = 'conditions/';
export const API_LOCATIONS = 'locations/v1/cities/geoposition/search';

export const apiLanguage = 'ru-ru';

const headers = {
    common: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
};

export const apiConfig: AxiosRequestConfig = {
    timeout: 60 * 5 * 1000 /* timeout 5 минут */,
    baseURL: 'https://api.aerisapi.com/',
    headers,
};
