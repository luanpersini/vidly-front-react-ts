import { apiUrl } from "../../config.json";
import { UserParams } from "../../interfaces";
import { httpResponseHandler } from "../http/http-response-handler";
import { Http } from './httpService';

const http = Http()
const apiEndpoint = apiUrl + "/users";

export async function register({name, email, password}: Omit<UserParams, "_id">) {
   
  const httpResponse = await http.request({
    url: apiEndpoint,
    method: 'post',
    body: { name: name, email: email, password: password }
  })

  return httpResponseHandler(httpResponse)

}
