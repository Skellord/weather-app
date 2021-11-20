import Api from './api';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { apiConfig, API_CONDITIONS, apiLanguage, API_FORECAST } from './apiConfig';
import { apiKey } from './apiKey';
import { ConditionResponse, ForecastResponse } from '../types/condition.types';

class ConditionsApi extends Api {
    public constructor(config: AxiosRequestConfig) {
        super(config);
    }

    public getConditionRequest(keyCode: string) {
        return this.get<ConditionResponse>(
            `${API_CONDITIONS}${keyCode}?apikey=${apiKey}&language=${apiLanguage}&details=true`
        )
            .then((response: AxiosResponse<ConditionResponse>) => {
                const { data } = response;
                return data;
            })
            .catch((error: AxiosError) => {
                throw error;
            });
    }

    public getForecastRequest(keyCode: string) {
        return this.get<ForecastResponse>(
            `${API_FORECAST}/${keyCode}?apikey=${apiKey}&language=${apiLanguage}&metric=true`
        )
            .then(response => {
                const { data } = response;
                return data;
            })
            .catch(error => {
                throw error;
            });
    }
}

const conditionsApi = new ConditionsApi(apiConfig);
export default conditionsApi;
