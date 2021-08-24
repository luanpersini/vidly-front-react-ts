import { HttpClient, HttpRequest, HttpResponse } from '../../protocols/http';
import { httpUnexpectedErrorHandler } from '../http/http-unexpected-error-handler';
import { LogErrorRepository } from './log-error-repository';

export class LogHttpDecorator implements HttpClient {
  
  constructor (
    private readonly httpClient: HttpClient,
    private readonly logErrorRepository: LogErrorRepository
  ) {}

  async request(httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.httpClient.request(httpRequest)
    if (httpResponse.statusCode === 500) {     
      await this.logErrorRepository.logError(httpResponse.body) 
      await httpUnexpectedErrorHandler(httpResponse)   
    }    
    return httpResponse
  }
}
