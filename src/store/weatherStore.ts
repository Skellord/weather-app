import { atom, selector } from 'recoil';
import { ConditionsResponse, GeoPosition, IResponse } from '../types/condition';
import conditionsApi from '../api/conditionsApi';

export const geoPositionState = atom<GeoPosition>({
    key: 'geoPosition',
    default: {
        latitude: '53.4304656',
        longitude: '59.0031243',
    },
});

export const weatherState = selector<IResponse>({
    key: 'weatherState',
    get: async ({ get }) => {
        const geoPosition = get(geoPositionState);
        const latitude = geoPosition.latitude;
        const longitude = geoPosition.longitude;
        const response: ConditionsResponse = (await conditionsApi.getConditionRequest(latitude, longitude)) || void 0;
        if (response?.success) {
            return response.response[0];
        }
        if (response?.error) {
            throw response.error;
        }
    },
});
