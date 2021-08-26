import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import { Button, CancelButton, Input, Select } from '../../components/form'
import { Title } from '../../components/template/page-title'
import { getGenres, getMovie, saveMovie } from '../../infra/services'
import { Validate } from '../../infra/validation/validate-adapter-factory'
import { GenreParams, MovieFormParams, MovieParams, Page } from '../../protocols'
import { HttpStatusCode } from '../../protocols/http'

const validate = Validate()
//TODO
//add Tests to Validate - Yup Adapter
//add old state and compare to avoid updates without changes
//add delete movie
//add optmistic update aproach

export function MovieForm(props: Page) {
  const history = useHistory()
  const [genres, setGenres] = useState<GenreParams[]>([])
  const [errors, setErrors] = React.useState<any[]>([])
  const [movie, setMovie] = useState<MovieFormParams | undefined>({
    title: undefined,
    genreId: undefined,
    numberInStock: undefined,
    dailyRentalRate: undefined
  })

  let title = props.title
  const { id: movieId } = useParams<{ id: string }>()
  if (movieId === 'new') title = 'New Movie'

  useEffect(() => {
    (async () => {
      try {
        const genres = await getGenres()
        setGenres(genres)
        if (movieId !== 'new') {
          const movie = await getMovie(movieId)
          if (HttpStatusCode.notFound === movie) {
            history.replace('/not-found')
            return
          }
          setMovie(mapToViewModel(movie))
        }
      } catch (error: any) {}
    })()
  }, [])
  const numberErrorMsg = '${label} must be a number.'
  const validationSchema: any = {
    _id: Yup.string(),
    title: Yup.string().required().min(2).max(100).label('Title'),
    genreId: Yup.string().required().label('Genre'),
    numberInStock: Yup.number().typeError(numberErrorMsg).required().min(0).max(100).label('Number in Stock'),
    dailyRentalRate: Yup.number().typeError(numberErrorMsg).required().min(0).max(10).label('Daily Rental Rate')
  }
  
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    const errorsFound = await validate.Many(movie, validationSchema)
    setErrors(errorsFound)    
    if (errors) return
    try {
      await saveMovie(movie)
      history.push('/movies')
    } catch (error: any) {}
  }

  async function handleChange({ currentTarget: input }: any) {
    const data: any = { ...movie }
    const {name, value} = input
    data[name] = value
    setMovie(data)

    const errorsFound = { ...errors }
    const errorMessage = await validate.One(name, value, validationSchema)

    if (errorMessage) errorsFound[input.name] = errorMessage
    else delete errorsFound[input.name]
    setErrors(errorsFound)   
  }

  function mapToViewModel(movie: MovieParams) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    }
  }

  // console.log('111' + JSON.stringify(errors))
  // console.log('222' + JSON.stringify(movie))

  return (
    <div>
      <Title title={title} />
      <form onSubmit={handleSubmit}>
        <Input
          name="title"
          label="Title"
          errors={errors}
          onChange={handleChange}
          inputvalue={movie}
        />
        <Select
          name="genreId"
          label="Genre"
          options={genres}
          errors={errors}
          onChange={handleChange}
          inputvalue={movie}
        />
        <Input
          name="numberInStock"
          label="Number in Stock"
          type="number"
          errors={errors}
          onChange={handleChange}
          inputvalue={movie}
        />
        <Input
          name="dailyRentalRate"
          label="Rate"          
          errors={errors}
          onChange={handleChange}
          inputvalue={movie}
        />
        <CancelButton label="Return" onClick={() => history.push('/movies')} />
        <Button type="submit" label="Submit" />
      </form>
    </div>
  )
}