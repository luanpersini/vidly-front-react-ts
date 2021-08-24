export type MovieParams = {
  _id: string
  title: string
  genre: {
    _id: string
    name: string
  }
  numberInStock: number
  dailyRentalRate: number
  liked?: boolean
}

export type MovieFormParams = {
  _id: string
  title: string
  genreId: string    
  numberInStock: number
  dailyRentalRate: number 
}