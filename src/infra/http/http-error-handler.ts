import { LogErrorRepository } from "../log/log-error-repository";
import { logError } from "../services/logService";

const log: LogErrorRepository = logError()

export async function httpErrorHandler(error:any){    
  await log.logError(error)
}