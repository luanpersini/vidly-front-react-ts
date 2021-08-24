import axios, { AxiosResponse } from 'axios'
import { HttpClient, HttpRequest, HttpResponse } from '../../protocols/http'

export class AxiosHttpAdapter implements HttpClient {
  async request(httpRequest: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await axios.request({
        url: httpRequest.url,
        method: httpRequest.method,
        data: httpRequest.body,
        headers: httpRequest.headers
      })
    } catch (error: any) {
      if (error.response) {
        axiosResponse = error.response
      } else {       
        return {         
          statusCode: 500,
          body: error.message
        }
      }  
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}
