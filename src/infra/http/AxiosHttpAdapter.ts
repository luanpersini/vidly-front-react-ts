import axios, { AxiosResponse } from 'axios'
import { HttpClient, HttpRequest, HttpResponse } from '../../protocols/http'
import { httpErrorHandler } from './http-error-handler'

export class AxiosHttpAdapter implements HttpClient {
  async request(data: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers
      })
    } catch (error: any) {
      return httpErrorHandler(error)
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}

