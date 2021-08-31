import Api from './api';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { apiConfig, API_CONDITIONS } from './apiConfig';
import { clientId, clientSecret } from './apiKey';

interface ConditionResp {
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
            cloudsCoded: string | null;
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
    error: undefined | null;
    response: [ConditionResp];
}

class ConditionsApi extends Api {
    public constructor(config: AxiosRequestConfig) {
        super(config);
    }

    public getConditionRequest(latitude: string, longitude: string) {
        return this.get<ConditionsResponse>(
            `${API_CONDITIONS}${latitude},${longitude}?format=json&client_id=${clientId}&client_secret=${clientSecret}`,
            apiConfig
        )
            .then((response: AxiosResponse<ConditionsResponse>) => {
                const { data } = response;
                return data;
            })
            .catch((error: AxiosError) => {
                throw error;
            });
    }
}

const conditionsApi = new ConditionsApi(apiConfig);
export default conditionsApi;
