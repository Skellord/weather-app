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

    public getUri(config?: AxiosRequestConfig): string {
        return this.api.getUri(config);
    }

    public request<T, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
        return this.api.request(config);
    }

    public get<T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        return this.api.get(url, config);
    }

    public delete<T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        return this.api.delete(url, config);
    }

    public head<T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        return this.api.head(url, config);
    }

    public post<T, R = AxiosResponse<T>>(
        url: string,
        data?: Record<any, any>,
        config?: AxiosRequestConfig
    ): Promise<R> {
        return this.api.post<T, R>(url, data, config);
    }

    public put<T, R = AxiosResponse<T>>(
        url: string,
        data?: Record<string, unknown>,
        config?: AxiosRequestConfig
    ): Promise<R> {
        return this.api.put(url, data, config);
    }

    public patch<T, R = AxiosResponse<T>>(
        url: string,
        data?: Record<any, any>,
        config?: AxiosRequestConfig
    ): Promise<R> {
        return this.api.patch(url, data, config);
    }
}
