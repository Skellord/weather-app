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
    cloudsCoded: CloudsCoded | undefined;
    place: string | undefined;

    constructor() {
        makeAutoObservable(this);
    }

    setCurrTemp(currTemp: number) {
        this.currTemp = Math.floor(currTemp);
    }

    setFeelsLike(tempFeelsLike: number) {
        this.feelsLike = Math.floor(tempFeelsLike);
    }

    setCloudsCoded(code: CloudsCoded | null) {
        if (!isNull(code)) {
            this.cloudsCoded = code;
        }
    }

    setIsLoaded(isLoaded: boolean) {
        this.isLoaded = isLoaded;
    }

    setPlace(place: string) {
        this.place = place;
    }

    async getWeatherCondition(latitude: string, longitude: string): Promise<ConditionResponse> {
        try {
            const response = (await conditionsApi.getConditionRequest(latitude, longitude)) || void 0;
            if (response?.success) {
                const currDay = response.response[0].periods[0];
                this.setCurrTemp(currDay.tempC);
                this.setFeelsLike(currDay.feelslikeC);
                this.setCloudsCoded(currDay.cloudsCoded);
                this.setIsLoaded(true);
            }
            return response.response[0];
        } catch (e) {
            throw e;
        }
    }
}

export default new weatherStore();
