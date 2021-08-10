import { apiUrl } from '../../config.json'
import { httpErrorHandler } from '../http/http-error-handler'
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
  
  switch (statusCode) {
     default: httpErrorHandler(statusCode)
  }
  return data
}
