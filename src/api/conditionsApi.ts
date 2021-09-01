import Api from './api';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { apiConfig, API_CONDITIONS } from './apiConfig';
import { clientId, clientSecret } from './apiKey';
import { ConditionsResponse } from '../types/condition';

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
