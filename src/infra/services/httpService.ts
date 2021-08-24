import { AxiosHttpAdapter } from '../http/AxiosHttpAdapter'
import { makeLogHttpDecorator } from '../log/log-http-decorator-factory'

export const Http = (): AxiosHttpAdapter => {
  const httpClient = new AxiosHttpAdapter()
  return makeLogHttpDecorator(httpClient)
}
