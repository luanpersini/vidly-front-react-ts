import { toast } from 'react-toastify'

export function AccessDeniedError() {
  toast.error('Acesso negado!')
  // const data = []
  return  []
}

export function UnexpectedError() {
  toast.error('Algo de errado aconteceu. Tente novamente em breve.')
  return []
}