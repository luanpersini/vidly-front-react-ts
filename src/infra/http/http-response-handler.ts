import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { HttpResponse, HttpStatusCode } from '../../protocols/http'
import { MovieNotFound } from '../../utils/errors'

type HandleParams = {
  action?: string | undefined
  message?: string | undefined
}

export async function httpResponseHandler( httpResponse: HttpResponse, handle?: HandleParams[]): Promise<any> {
  let data: any = []
  let message = httpResponse.body
  const statusCode = httpResponse.statusCode
    
  const handleItems = (!handle) ? [{action: 'none', message: 'none'}]: handle 
    
  handleItems?.forEach((handle) => {
    const { message: customMessage, action } = handle

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
  }) 
  return data
}
