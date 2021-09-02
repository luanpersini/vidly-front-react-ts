import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { HttpResponse, HttpStatusCode } from '../../interfaces/http-client'
import { UnexpectedError } from '../../utils/errors'

export async function httpUnexpectedErrorHandler( httpResponse: HttpResponse): Promise<void> {
    const statusCode = httpResponse.statusCode
    if (statusCode === HttpStatusCode.serverError) { 
      const message = new UnexpectedError().message 
      toast.error(message)    
      throw new UnexpectedError()      
    }  
}
