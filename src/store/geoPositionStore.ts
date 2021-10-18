import { makeAutoObservable } from 'mobx';
import { CitiesResponse, GeoLocationResponse } from '../types/geoPosition.types';
import locationsApi from '../api/locationsApi';

class geoPositionStore {
    latitude!: string;
    longitude!: string;
    place!: string;
    isLoaded = false;
    keyCode!: string;

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

    setKeyCode(key: string) {
        this.keyCode = key;
    }

    async getCurrentLocation(latitude: string, longitude: string): Promise<GeoLocationResponse> {
        try {
            const response = await locationsApi.getLocationRequest(latitude, longitude);
            if (response) {
                this.setPlace(response.LocalizedName);
                this.setIsLoaded(true);
            }
            return response;
        } catch (error) {
            throw error;
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

export default new geoPositionStore();
