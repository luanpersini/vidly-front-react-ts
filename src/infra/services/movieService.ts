import { apiUrl } from '../../config.json'
import { httpResponseHandler } from '../http/http-response-handler'
import { Http } from './httpService'
const http = Http()
const apiEndpoint = apiUrl + '/movies'


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
  let httpResponse = undefined
  if (movie._id) {
    const body = { ...movie }
    delete body._id
    httpResponse = await http.request({
      url: movieUrl(movie._id),
      method: 'put',
      body: body
    })
  }else{
  httpResponse = await http.request({
    url: apiEndpoint,
    method: 'post',
    body: movie
  })
}
  const handle = [
    { action: 'Success'}    
  ]
  return httpResponseHandler(httpResponse, handle)  
}


/*
import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/movies";

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
