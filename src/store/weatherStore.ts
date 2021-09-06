import { CloudsCoded, ConditionResponse } from '../types/condition.types';
import conditionsApi from '../api/conditionsApi';
import { makeAutoObservable } from 'mobx';
import { isNull } from 'lodash';

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
                this.setPlace(response.response[0].place.name);
                this.setIsLoaded(true);
            }
            return response.response[0];
        } catch (e) {
            throw e;
        }
    }
}

export default new weatherStore();

// export const weatherState = selector<ConditionResponse>({
//     key: 'weatherState',
//     get: async ({ get }) => {
//         const geoPosition = get(geoPositionState);
//         const latitude = geoPosition.latitude;
//         const longitude = geoPosition.longitude;
//         const response: ConditionsResponse = (await conditionsApi.getConditionRequest(latitude, longitude)) || void 0;
//         if (response?.success) {
//             return response.response[0];
//         }
//         if (response?.error) {
//             throw response.error;
//         }
//     },
// });
