
export function AccessDeniedError() {
  return 'Acesso negado!'
}

export function UnexpectedError() {
  return 'Algo de errado aconteceu. Tente novamente em breve.'
}

// {
//   ok = 200,
//   noContent = 204,
//   badRequest = 400,
//   unauthorized = 401,
//   forbidden = 403,
//   notFound = 404,
//   serverError = 500  
// }