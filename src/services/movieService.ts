import { apiUrl } from "../config.json";
import { HttpStatusCode } from "../protocols/http";
import { MovieParams } from '../protocols/movie';
import { AccessDeniedError, UnexpectedError } from "../utils/errors";
import { HttpClient } from "./http/httpService";

const apiEndpoint = apiUrl + "/movies";

export async function getMovies(): Promise<MovieParams[]> { 

  const httpClient = HttpClient()
     const httpResponse = await httpClient.request({
     url: apiEndpoint,
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

/*
function movieUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getMovies() {
  return http.get(apiEndpoint);
}

export function getMovie(movieId) {
  return http.get(movieUrl(movieId));
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
