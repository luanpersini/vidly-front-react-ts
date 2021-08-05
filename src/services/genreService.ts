
// import { AxiosPromise } from "axios";
// import { apiUrl } from "../config.json";
// import http from "./httpService";

import { apiUrl } from "../config.json";
import { GenreParams } from "../protocols/genre";
import { HttpStatusCode } from "../protocols/http";
import { AccessDeniedError, UnexpectedError } from "../utils/errors";
import { HttpClient } from "./http/httpService";

export async function getGenres(): Promise<GenreParams[]> { 

   const httpClient = HttpClient()
      const httpResponse = await httpClient.request({
      url: apiUrl + '/genres',
      method: 'get'
    })
    const data = httpResponse.body
    console.log('data --- ' + JSON.stringify(data));
    
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return data
      case HttpStatusCode.noContent: return []
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }


  // const httpClient = HttpClient()
  // const response = await httpClient.request({
  //   url: apiUrl + '/genres',
  //   method: 'get'
  // })
  // console.log('----aaa--' + JSON.stringify(response));
  // return response  



