import { Http } from './httpService'
import { apiUrl } from '../../config.json'
import { httpResponseHandler } from '../http/http-response-handler'

const http = Http()

// export async function getGenres(): Promise<GenreParams[]> {
export async function getGenres(): Promise<any> {
  const httpResponse = await http.request({
    url: apiUrl + '/genres',
    method: 'get'
  })  

  return httpResponseHandler(httpResponse)
  
}
