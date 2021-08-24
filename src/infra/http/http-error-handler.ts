import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { HttpResponse } from '../../protocols/http'
type HandlerParams = {
  action: string
  customMessage: string
}
export async function httpErrorHandler(httpResponse: HttpResponse, handle?: any[]): Promise<any> {
  const data = httpResponse.body
  let message = httpResponse.body
  const statusCode = httpResponse.statusCode

  handle?.forEach((handle, index) => {
    const { action, message } = handle
    console.log(action + '---' + JSON.stringify(message))
  })
  if (statusCode === 404) {
    message = 'The Movie with the given ID was not Found'
    toast.error(message);
    return 404
  }

  //   if (statusCode >= 200 && statusCode <= 299) {
  //       if(action === 'Toast'){
  //         message = (!customMessage) ? 'Success' : customMessage
  //         toast.success(message)
  //       }
  //     return
  //   }

  //   if (statusCode > 299 && !action) {
  //   switch (statusCode) {
  //     case HttpStatusCode.forbidden: message = "AccessDeniedError()"
  //     break;
  //     default: message = "UnexpectedError"
  //   }
  // }
  // if (HttpStatusCode.forbidden && action) {
  //        switch (action) {
  //         case 'EmailInUse': message = "EmailInUseError()";
  //         break;
  //         default:  message = "Access Denied"  ;
  //     }
  // }
  //       if (type === 'success') {
  //         toast.success(message);
  //         return []
  //       }else if (type === 'error') {
  //         toast.error(message);
  //         console.log();
  //       }

  return data
}
