import { CloudsCoded, ConditionResponse } from '../types/condition.types';
import conditionsApi from '../api/conditionsApi';
import { makeAutoObservable } from 'mobx';
import { isNull } from 'lodash';
import { GeoLocationResponse } from '../types/geoPosition.types';
import locationsApi from '../api/locationsApi';

class weatherStore {
    isLoaded = false;
    currTemp: number | undefined;
    feelsLike: number | undefined;
    cloudsCoded: string | undefined;

    constructor() {
        makeAutoObservable(this);
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

    setIsLoaded(isLoaded: boolean) {
        this.isLoaded = isLoaded;
    }

    async getWeatherCondition(keyCode: string): Promise<ConditionResponse> {
        try {
            const response = (await conditionsApi.getConditionRequest(keyCode)) || void 0;
            if (response?.length > 0) {
                const currDay = response[0];
                this.setCurrTemp(currDay.Temperature.Metric.Value);
                this.setFeelsLike(currDay.RealFeelTemperature.Metric.Value);
                this.setCloudsCoded(currDay.WeatherText);
                this.setIsLoaded(true);
            }
            return response;
        } catch (e) {
            throw e;
        }
    }
}

export default new weatherStore();
