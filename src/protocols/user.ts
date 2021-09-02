export type UserParams = {
  _id: {
    $oid: string
  }
  name: string
  email: string
  password: string
}

export type UserJwtParams = {
  _id?: {
    $oid: string
  }
  name: string
  isAdmin?: boolean
  iat?: number
}