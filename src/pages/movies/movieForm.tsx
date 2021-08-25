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
  const [movie, setMovie] = useState<MovieFormParams | undefined>(undefined)

  let title = props.title
  const { id: movieId } = useParams<{ id: string }>()
  if(movieId === 'new') title = 'New Movie'
  
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
    const obj = { [name]: value }
    const schema = Yup.object().shape({ [name]: validationSchema[name] })
    const error = await schema
      .validate(obj)
      .then(function (value: any) {
        console.log(value)
      })
      .catch(function (err: any) {
        return err.message
      })
    return error
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

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    try {
      await saveMovie(movie)
    } catch (error: any) {}
    history.push('/movies')
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

  console.log('111' + JSON.stringify(errors))
  console.log('222' + JSON.stringify(movie))

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

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().min(2).max(100).label('Title'),
    genreId: Joi.string().required().label('Genre'),
    numberInStock: Joi.number().required().min(0).max(100).label('Number in Stock'),
    dailyRentalRate: Joi.number().required().min(0).max(10).label('Daily Rental Rate')
  }

  const validationSchema = Yup.object({
    product: Yup.string().required("Please select a product").oneOf(products),
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    title: Yup.string().required(),
    review: Yup.string().required(),
    rating: Yup.number().min(1).max(10).required(),
    date: Yup.date().default(() => new Date()),
    wouldRecommend: Yup.boolean().default(false),
  });

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}    
          {this.renderSelect('genreId', 'Genre', this.state.genres)}
          {this.renderInput('numberInStock', 'Number in Stock', 'number')}
          {this.renderInput('dailyRentalRate', 'Rate')}
          {this.renderButton('Save')}
        </form>
      </div>
    )
  }
}

export default MovieForm
*/
