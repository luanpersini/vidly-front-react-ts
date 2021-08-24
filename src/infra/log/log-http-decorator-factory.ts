import { HttpClient } from "../../protocols/http"
import { LogHttpDecorator } from "./log-http-decorator"
import { LogMongoRepository } from "./log-mongo-repository"


export const makeLogHttpDecorator = (httpClient: HttpClient): HttpClient => {
  const logMongoRepository = new LogMongoRepository()
  return new LogHttpDecorator(httpClient, logMongoRepository)
}
