import Api from './api';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { apiConfig, API_CONDITIONS, apiLanguage } from './apiConfig';
import { apiKey, clientId, clientSecret } from './apiKey';
import { ConditionResponse } from '../types/condition.types';

const locationsApiConfig: AxiosRequestConfig = {
    baseURL: 'http://dataservice.accuweather.com/',
};

class ConditionsApi extends Api {
    public constructor(config: AxiosRequestConfig) {
        super(config);
    }

    public getConditionRequest(keyCode: string) {
        return this.get<ConditionResponse>(
            `${API_CONDITIONS}${keyCode}?apikey=${apiKey}&language=${apiLanguage}&details=true`,
            locationsApiConfig
        )
            .then((response: AxiosResponse<ConditionResponse>) => {
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
