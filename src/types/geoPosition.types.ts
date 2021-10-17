export interface GeoLocationResponse {
    LocalizedName: string;
    EnglishName: string;
}

export interface GeoLocationCityResponse extends GeoLocationResponse {
    Key: string;
    GeoPosition: {
        Latitude: number;
        Longitude: number;
    };
    AdministrativeArea: GeoLocationResponse | { LocalizedType: string };
}

export type CitiesResponse = GeoLocationCityResponse[];

export interface GeoPosition {
    latitude: string;
    longitude: string;
}
