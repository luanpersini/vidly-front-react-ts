import { HttpClient, HttpRequest, HttpResponse } from '../../interfaces/http-client'
import axios, { AxiosResponse } from 'axios'

import { MapToMongoIdHelper } from './map-to-mongo-id-helper'

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
    // This is converting incoming data with id to _id. The best solution would have been build this app receiving id and mapping the mongo _id to id, since its the only database i know that uses _id. 
    let body = axiosResponse.data
    if(Array.isArray(body)){
      body = MapToMongoIdHelper.mapArray(body) 
    }else{
      body = MapToMongoIdHelper.map(body)     
    }
    
    return {
      statusCode: axiosResponse.status,
      body: body
    }
  }
}
