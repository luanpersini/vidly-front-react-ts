import { apiUrl } from '../../config.json'
// import { httpErrorHandler } from '../http/http-error-handler'
import { Http } from './httpService'

const http = Http()

// export async function getGenres(): Promise<GenreParams[]> {
export async function getGenres(): Promise<any> {
  const httpResponse = await http.request({
    url: apiUrl + '/genres',
    method: 'get'
  })  
  const data = httpResponse.body
  const statusCode = httpResponse.statusCode
  
  const handle = [{action: 'Toast', message: 'Sucesssao'},{action:'Email', message: 'Erro Email'} ]
 
  // httpErrorHandler(httpResponse, handle)
  // if(statusCode === 404) return 404
  return data
}
