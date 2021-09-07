import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import { Button, CancelButton, Input, Select } from '../../components/form'
import { Title } from '../../components/template/page-title'
import { getGenres, getMovie, saveMovie } from '../../infra/services'
import { Validate } from '../../infra/validation/validate-factory'
import { GenreParams, MovieFormParams, MovieParams, Page } from '../../interfaces'
import { HttpStatusCode } from '../../interfaces/http-client'

//TODO
//tratar bad request
//add Tests to Validate - Yup Adapter
//add old state and compare to avoid updates without changes
//add delete movie
//add optmistic update aproach
//add submit enabled/disabled

export function MovieForm(props: Page) {
  const validate = Validate()
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
    numberInStock: Yup.number()
      .typeError(numberErrorMsg)
      .required()
      .min(0)
      .max(100)
      .label('Number in Stock'),
    dailyRentalRate: Yup.number()
      .typeError(numberErrorMsg)
      .required()
      .min(0)
      .max(10)
      .label('Daily Rental Rate')
  }

  async function handleChange({ currentTarget: input }: any) {
    const formData: any = { ...movie }
    const { name, value } = input
    formData[name] = value
    setMovie(formData)

    const errorsFound = { ...errors }
    const errorMessage = await validate.One(name, value, validationSchema)

    if (errorMessage) errorsFound[input.name] = errorMessage
    else delete errorsFound[input.name]
    setErrors(errorsFound)
  }
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    const errorsFound = await validate.Many(movie, validationSchema)
    setErrors(errorsFound)

    //return to render the page again and show the errors before reaching the server
    if (Object.keys(errors).length > 0) return
    if (movie?.title === '') return

    try {
      await saveMovie(movie)
      history.push('/movies')
    } catch (error: any) {}
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

        <div>
          <CancelButton label="Return" onClick={() => history.push('/movies')} />
          <Button type="submit" label="Submit" />
        </div>
      </form>
    </div>
  )
}
