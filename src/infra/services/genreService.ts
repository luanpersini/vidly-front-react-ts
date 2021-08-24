import { apiUrl } from '../../config.json'
import { httpResponseHandler } from '../http/http-response-handler'
// import { httpResponseHandler } from '../http/http-error-handler'
import { Http } from './httpService'

const http = Http()

// export async function getGenres(): Promise<GenreParams[]> {
export async function getGenres(): Promise<any> {
  const httpResponse = await http.request({
    url: apiUrl + '/genres',
    method: 'get'
  })  

  return httpResponseHandler(httpResponse)

  // const data = httpResponse.body
  // switch (httpResponse.statusCode) {
  //   case HttpStatusCode.ok: return data    
  //   default: return []
  // }
  
}
