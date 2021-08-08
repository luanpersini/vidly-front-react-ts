import { AxiosHttpAdapter } from '../http/AxiosHttpAdapter';

export const HttpClient = (): AxiosHttpAdapter => new AxiosHttpAdapter()

