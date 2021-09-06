import { makeAutoObservable } from 'mobx';
import { GeoLocationResponse } from '../types/geoPosition.types';
import locationsApi from '../api/locationsApi';

class geoPositionStore {
    latitude!: string;
    longitude!: string;
    place: string | undefined;

    constructor() {
        makeAutoObservable(this);
    }

    setCoordinates(lat: string, long: string) {
        this.latitude = lat;
        this.longitude = long;
    }

    setPlace(place: string) {
        this.place = place;
    }

    async getCurrentLocation(): Promise<GeoLocationResponse> {
        try {
            const response = (await locationsApi.getLocationRequest(this.latitude, this.longitude)) || void 0;
            this.setPlace(response.LocalizedName);
            return response;
        } catch (e) {
            throw e;
        }
    }
}

export default new geoPositionStore();
