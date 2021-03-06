import { AxiosRequestConfig } from 'axios';

export const API_CONDITIONS = 'currentconditions/v1/';
export const API_LOCATIONS = 'locations/v1/cities/geoposition/search';
export const API_LOCATIONS_TEXT = 'locations/v1/search';
export const API_FORECAST = 'forecasts/v1/daily/5day';

export const apiLanguage = 'ru-ru';

export const apiConfig: AxiosRequestConfig = {
    timeout: 60 * 5 * 1000 /* timeout 5 минут */,
    baseURL: 'http://dataservice.accuweather.com/',
};
