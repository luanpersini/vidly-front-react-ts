import { apiUrl } from '../../config.json'
import { httpResponseHandler } from '../http/http-response-handler'
import { Http } from './httpService'

const apiEndpoint = apiUrl + '/movies'
const http = Http()

function movieUrl(id: any) {
  return `${apiEndpoint}/${id}`
}
// export async function getMovies(): Promise<MovieParams[]> {
export async function getMovies(): Promise<any> {
  const httpResponse = await http.request({
    url: apiEndpoint,
    method: 'get'
  })
    
  return httpResponseHandler(httpResponse) 
  
  // const data = httpResponse.body
  // switch (httpResponse.statusCode) {
  //   case HttpStatusCode.ok: return data    
  //   default: return []
  // }
  
}

export async function getMovie(movieId: any): Promise<any> {
  const httpResponse = await http.request({
    url: movieUrl(movieId),
    method: 'get'
  })  
  const handle = [
    { action: 'MovieNotFound' }    
  ]
  return httpResponseHandler(httpResponse, handle)   
}

export async function saveMovie(movie: any) {
  if (movie._id) {
    const body = { ...movie }
    delete body._id
    return await http.request({
      url: movieUrl(movie._id),
      method: 'put',
      body: body
    })
  }
}

/*
function movieUrl(id) {
  return `${apiEndpoint}/${id}`;
}



export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(movieUrl(movie._id), body);
  }

  return http.post(apiEndpoint, movie);
}

export function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId));
}
*/
