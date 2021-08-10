import { toast } from "react-toastify";
import { HttpStatusCode } from "../../protocols/http";

export async function httpErrorHandler(statusCode: number, action?: string): Promise<any>  { 
    let type = ''
    let message = ''

  if (statusCode >= 200 && statusCode <= 299 && action) {
    type = 'success'
    message = 'Success'      
    }


  if (statusCode > 299 && !action) {
  switch (statusCode) {
    case HttpStatusCode.forbidden: message = "AccessDeniedError()" 
    break;  
    default: message = "UnexpectedError" 
  }
}
if (HttpStatusCode.forbidden && action) {
       switch (action) {
        case 'EmailInUse': message = "EmailInUseError()";
        break; 
        default:  message = "Access Denied"  ;
    }    
} 
      if (type === 'success') {
        toast.success(message);  
        return [] 
      }else if (type === 'error') {
        toast.error(message);
        console.log();          
      }     
 
 }

//  switch (statusCode) {
//   case HttpStatusCode.forbidden: httpErrorHandler(statusCode)
//   break
//   default: httpErrorHandler(statusCode)
// }