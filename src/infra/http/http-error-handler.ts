import { toast } from "react-toastify";
import { HttpResponse } from "../../protocols/http";


export async function httpErrorHandler(error: any): Promise<HttpResponse>  { 
     if (error.response) {       
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx 
      return {
        statusCode: error.response.status,
        body: error.response.data
      }

      } else if (error.message === 'Network Error') { 
        toast.error("Server Offline. Please, try again in a few minutes.");            
          return {
            statusCode: 503,
            body: []
          }        
      } else {           
        toast.error("Unexpected Error.");   
        return {
          statusCode: 500,
          body: []
        }   
      }  
 }

