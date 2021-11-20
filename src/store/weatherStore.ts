import { ConditionResponse, ForecastResponse } from '../types/condition.types';
import conditionsApi from '../api/conditionsApi';
import { makeAutoObservable } from 'mobx';
import { isNull } from 'lodash';
import { CitiesResponse, GeoLocationResponse } from '../types/geoPosition.types';
import locationsApi from '../api/locationsApi';

class weatherStore {
    isLocationLoaded = false;
    isWeatherLoaded = false;
    isForecastLoaded = false;
    currTemp: number | undefined;
    feelsLike: number | undefined;
    cloudsCoded: string | undefined;
    latitude!: string;
    longitude!: string;
    place!: string;
    keyCode!: string;
    forecast!: ForecastResponse;
    iconNumber: number = 11;

    constructor() {
        makeAutoObservable(this);
    }

    setPlace(place: string) {
        this.place = place;
    }

    setCurrTemp(currTemp: number) {
        this.currTemp = Math.floor(currTemp);
    }

    setFeelsLike(tempFeelsLike: number) {
        this.feelsLike = Math.floor(tempFeelsLike);
    }

    setCloudsCoded(code: string | null) {
        if (!isNull(code)) {
            this.cloudsCoded = code;
        }
    }

    setLocationLoaded(isLoaded: boolean) {
        this.isLocationLoaded = isLoaded;
    }

    setWeatherLoaded(isLoaded: boolean) {
        this.isWeatherLoaded = isLoaded;
    }

    setKeyCode(key: string) {
        this.keyCode = key;
    }

    setForecast(forecast: any) {
        this.forecast = forecast;
    }

    setForecastLoaded(isLoaded: boolean) {
        this.isForecastLoaded = isLoaded;
    }

    setIconNumber(num: number) {
        this.iconNumber = num;
    }

    async getCurrentLocation(latitude: string, longitude: string): Promise<GeoLocationResponse> {
        this.setLocationLoaded(false);
        try {
            const response = await locationsApi.getLocationRequest(latitude, longitude);
            if (response) {
                this.setLocationLoaded(true);
                this.setPlace(response.LocalizedName);
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getWeatherCondition(keyCode: string): Promise<ConditionResponse> {
        this.setWeatherLoaded(false);
        try {
            const response = (await conditionsApi.getConditionRequest(keyCode)) || void 0;
            if (response?.length > 0) {
                const currDay = response[0];
                this.setCurrTemp(currDay.Temperature.Metric.Value);
                this.setFeelsLike(currDay.RealFeelTemperature.Metric.Value);
                this.setCloudsCoded(currDay.WeatherText);
                this.setWeatherLoaded(true);
                this.setIconNumber(currDay.WeatherIcon);
            }
            return response;
        } catch (e) {
            throw e;
        }
    }

    async getWeatherForecast(keyCode: string): Promise<ForecastResponse> {
        this.setForecastLoaded(false);
        try {
            const response = (await conditionsApi.getForecastRequest(keyCode)) || void 0;
            if (response) {
                this.setForecast(response);
                this.setForecastLoaded(true);
            }
            return response;
        } catch (e) {
            throw e;
        }
    }

    async fetchCityQuery(query: string): Promise<CitiesResponse> {
        try {
            return await locationsApi.fetchCitiesQueries(query);
        } catch (error) {
            throw error;
        }
    }
}

export default new weatherStore();
