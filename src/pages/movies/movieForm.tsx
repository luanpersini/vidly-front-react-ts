import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import { Button, CancelButton, Input, Select } from '../../components/form'
import { Title } from '../../components/template/page-title'
import { getGenres, getMovie, saveMovie } from '../../infra/services'
import { GenreParams, MovieFormParams, MovieParams, Page } from '../../protocols'
import { HttpStatusCode } from '../../protocols/http'
// import { getMovie, saveMovie } from '../../infra/services/movieService'
interface FormErrors {
  name: string
  message: string
}
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

  const validationSchema: any = {
    _id: Yup.string(),
    title: Yup.string().required().min(2).max(100).label('Title'),
    genreId: Yup.string().required().label('Genre'),
    numberInStock: Yup.number().required().min(0).max(100).label('Number in Stock'),
    dailyRentalRate: Yup.number().required().min(0).max(10).label('Daily Rental Rate')
  }

  async function validateProperty({ name, value }: any) {
    const fixedValue: any = value === null || value === '' ? undefined : value
    const obj = { [name]: fixedValue }
    const schema = Yup.object().shape({ [name]: validationSchema[name] })
    const error = await schema
      .validate(obj)
      .then(function (value: any) {
        return undefined
      })
      .catch(function (err: any) {
        return err.message
      })
    return error
  }

  async function validate(obj: any) {
    let error: any = { ...errors }

    await Promise.all(
      Object.entries(obj).map(async (item: any) => {
        const key = item[0]
        const value = item[1]
        const data = { name: key, value: value }
        const errorMessage = await validateProperty(data)
        if (errorMessage !== undefined) error[key] = errorMessage
      })
    )
    if(Object.entries(error).length === 0) error = undefined
    
    return error
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    const errors = await validate(movie)
    setErrors(errors)
    console.log('errors ---xxx--' + JSON.stringify(errors))
    if (errors) return
    try {
      await saveMovie(movie)
      history.push('/movies')
    } catch (error: any) {}
  }

  async function handleChange({ currentTarget: input }: any) {
    const data: any = { ...movie }
    data[input.name] = input.value
    setMovie(data)

    const errorsFound = { ...errors }
    const errorMessage = await validateProperty(input)

    if (errorMessage) errorsFound[input.name] = errorMessage
    else delete errorsFound[input.name]
    setErrors(errorsFound)
    console.log('err found - ' + JSON.stringify(errorsFound))
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
/*
  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (const item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };
*/

/*
  async function validate(obj: any) {    
    // setErrors([])
    const error: any = { ...errors }
    const schema = Yup.object().shape(validationSchema)
    const data: any = {}
    const a = 0
       
    console.log('BEFORE')
      await Promise.all(Object.entries(obj).map(async (item: any) => {
      
      const key = item[0]
      const value = item[1]         
      const data = { name: key, value: value }
      const errorMessage = await validateProperty(data)
      if (errorMessage !== undefined) console.log('errorMessage  ----' + key + '  -  ' + errorMessage)
      if (errorMessage !== undefined) error[key] = errorMessage
      })).then(value => {
        console.log('THEN')
        console.log('error ----' + JSON.stringify(error))        
        setErrors(error)
        console.log('errors ---xxx--' + JSON.stringify(errors))
      })
      console.log('AFTER')  
      return error   
    
  }
  */
