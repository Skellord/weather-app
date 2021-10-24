import { CloudsCoded, ConditionResponse } from '../types/condition.types';
import conditionsApi from '../api/conditionsApi';
import { makeAutoObservable } from 'mobx';
import { isNull } from 'lodash';
import { CitiesResponse, GeoLocationResponse } from '../types/geoPosition.types';
import locationsApi from '../api/locationsApi';

class weatherStore {
    isLocationLoaded = false;
    isWeatherLoaded = false;
    currTemp: number | undefined;
    feelsLike: number | undefined;
    cloudsCoded: string | undefined;
    latitude!: string;
    longitude!: string;
    place!: string;

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

    async getCurrentLocation(latitude: string, longitude: string): Promise<GeoLocationResponse> {
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
        try {
            const response = (await conditionsApi.getConditionRequest(keyCode)) || void 0;
            if (response?.length > 0) {
                const currDay = response[0];
                this.setCurrTemp(currDay.Temperature.Metric.Value);
                this.setFeelsLike(currDay.RealFeelTemperature.Metric.Value);
                this.setCloudsCoded(currDay.WeatherText);
                this.setWeatherLoaded(true);
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
