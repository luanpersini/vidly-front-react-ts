import { Validate } from '../../infra/validation/validate-factory'

const validate = Validate()

export const handle = {  

async change(name: string, value: any, validationSchema: any) {
  const errorsFound: any = {}
  const errorMessage = await validate.One(name, value, validationSchema)

  if (errorMessage) errorsFound[name] = errorMessage
  else delete errorsFound[name]
   
  return errorsFound
}
}