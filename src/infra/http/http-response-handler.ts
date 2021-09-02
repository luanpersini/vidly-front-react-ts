import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { HttpResponse, HttpStatusCode } from '../../interfaces/http-client'
import { MovieNotFound } from '../../utils/errors'
import { BadRequestError } from '../../utils/errors/bad-request-error'
import { InvalidCredentials } from '../../utils/errors/error-messages'


type HandleParams = {
  action?: string | undefined
  customMessage?: string | undefined
}

export function httpResponseHandler( httpResponse: HttpResponse, handle?: HandleParams[]) {
  let data: any = []
  let message = httpResponse.body
  const statusCode = httpResponse.statusCode
    
  const handleItems = (!handle) ? [{action: 'none', customMessage: 'none'}]: handle 
    
  handleItems?.forEach((handle) => {
    const { customMessage, action } = handle
    console.log('customMessage' + customMessage);
    
    if (statusCode >= 200 && statusCode <= 299) {
      if (action === 'Success') {
        message = !customMessage || customMessage === '' ? 'Success' : message
        toast.success(message)
      }
      data = httpResponse.body
    }

    if (statusCode === HttpStatusCode.notFound) {
      if (action === 'NotFound') {
        message = !customMessage || customMessage === '' ? message : customMessage        
      }
      if (action === 'MovieNotFound') {
        message = MovieNotFound  
        toast.error(message)      
      }     
      data = HttpStatusCode.notFound
    }

    if (statusCode === HttpStatusCode.forbidden) {      
      if (action === 'Forbidden') {
        message = !customMessage || customMessage === '' ? message : customMessage
        toast.error(message)
      }
    }

    if (statusCode === HttpStatusCode.badRequest) {           
      if (action === 'BadRequest') {
        message = !customMessage || customMessage === '' ? message : customMessage
        toast.error(message)
      }
      if (action === 'InvalidCredentials') {
        message = !customMessage || customMessage === '' ? InvalidCredentials : customMessage     
      } 
      throw new BadRequestError(message)       
    }
  }) 
  return data
}
