export type CloudsCoded = 'CL' | 'FW' | 'SC' | 'BK' | 'OV';

// export enum Clouds {
//     'Clear' = ''
// }

export interface IResponse {
    loc: {
        lat: number;
        long: number;
    };
    place: {
        name: string;
        state: string;
        country: string;
    };
    periods: [
        {
            timestamp: number;
            dateTimeISO: string;
            tempC: number;
            tempF: number;
            feelslikeC: number;
            feelslikeF: number;
            dewpointC: number;
            dewpointF: number;
            humidity: number;
            pressureMB: number;
            pressureIN: number;
            windDir: string;
            windDirDEG: number;
            windSpeedKTS: number;
            windSpeedKPH: number;
            windSpeedMPH: number;
            windGustKTS: number;
            windGustKPH: number;
            windGustMPH: number;
            precipMM: number | null;
            precipIN: number | null;
            snowCM: number | null;
            snowIN: number | null;
            visibilityKM: number | null;
            visibilityMI: number | null;
            sky: number | null;
            cloudsCoded: CloudsCoded | null;
            weather: string | null;
            weatherCoded: string | null;
            weatherPrimary: string | null;
            weatherPrimaryCoded: string | null;
            icon: string;
            solradWM2: number;
            uvi: number | null;
            isDay: boolean;
        }
    ];
    profile: {
        tz: string;
        tzname: string;
        tzoffset: number;
        isDST: boolean;
        elevFT: null;
        elevM: null;
    };
}

export interface ConditionsResponse {
    success: boolean;
    error: undefined | null | number;
    response: IResponse[];
}

export interface GeoPosition {
    latitude: string;
    longitude: string;
}
