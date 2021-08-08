import { apiUrl } from '../../config.json'
import { GenreParams } from '../../protocols/genre'
import { HttpStatusCode } from '../../protocols/http'
import { HttpClient } from './httpService'

export async function getGenres(): Promise<GenreParams[]> {
  const httpClient = HttpClient()
  const httpResponse = await httpClient.request({
    url: apiUrl + '/genres',
    method: 'get'
  })
  const data = httpResponse.body

  switch (httpResponse.statusCode) {
    case HttpStatusCode.ok: return data
   //  case HttpStatusCode.forbidden: throw new EmailInUseError()  
  //  case HttpStatusCode.forbidden: throw new AccessDeniedError()   
    default:  return []
  }
}
