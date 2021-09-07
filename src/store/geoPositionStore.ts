import { makeAutoObservable } from 'mobx';
import { GeoLocationResponse } from '../types/geoPosition.types';
import locationsApi from '../api/locationsApi';

class geoPositionStore {
    latitude!: string;
    longitude!: string;
    place!: string;
    isLoaded = false;

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

    setIsLoaded(isLoaded: boolean) {
        this.isLoaded = isLoaded;
    }

    async getCurrentLocation(latitude: string, longitude: string): Promise<GeoLocationResponse> {
        try {
            const response = await locationsApi.getLocationRequest(latitude, longitude);
            if (response) {
                this.setPlace(response.LocalizedName);
                this.setIsLoaded(true);
            }
            return response;
        } catch (e) {
            throw e;
        }
    }
}

export default new geoPositionStore();
