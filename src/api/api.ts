import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export default class Api {
    private api: AxiosInstance;

    constructor(config: AxiosRequestConfig) {
        this.api = axios.create(config);

        this.api.interceptors.request.use((param: AxiosRequestConfig) => ({
            ...param,
        }));

        this.api.interceptors.response.use((param: AxiosResponse) => ({
            ...param,
        }));
    }

    public get<T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        return this.api.get(url, config);
    }

    public post<T, R = AxiosResponse<T>>(
        url: string,
        data?: Record<any, any>,
        config?: AxiosRequestConfig
    ): Promise<R> {
        return this.api.post<T, R>(url, data, config);
    }
}
