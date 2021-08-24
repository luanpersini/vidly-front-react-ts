import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Button, CancelButton, Input, Select } from '../../components/form'
import { Title } from '../../components/template/page-title'
import { getGenres, getMovie } from '../../infra/services'
import {
  GenreParams,
  MovieFormParams,
  MovieParams,
  Page
} from '../../protocols'
import { HttpStatusCode } from '../../protocols/http'
// import { getMovie, saveMovie } from '../../infra/services/movieService'
interface FormErrors {
  name: string
  message: string
}
export function MovieForm(props: Page) {
  const history = useHistory()
  // const [errors, setErrors] = React.useState<FormErrors[]>([{name: "Email", message: "Email is required"},{name: "Title", message: "Title is required"}]);
  const [genres, setGenres] = useState<GenreParams[]>([])
  const [errors, setErrors] = React.useState<FormErrors[]>([
    { name: 'Email', message: 'Email is required' }
  ])
  const [movie, setMovie] = useState<MovieFormParams | undefined>(undefined)

  let title = props.title
  const { id: movieId } = useParams<{ id: string }>()

  useEffect(() => {
    (async () => {
      const genres = await getGenres()
      setGenres(genres)
      if (movieId === 'new') {
        title = 'New Movie'
      } else {
        const movie = await getMovie(movieId)
        if (HttpStatusCode.notFound === movie) {
          history.replace('/not-found/movie_not_found')
          return
        }
        setMovie(mapToViewModel(movie))
      }
    })()
  }, [])

  function handleSubmit() {
    console.log('lalalal -------')
    history.push('/movies')
  }

  function handleCancel() {
    console.log('canceled-------')
    history.goBack()
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
  // inputValues={movie}
  return (
    <div>
      <Title title={title} />
      <form onSubmit={handleSubmit}>
        <Input name="title" label="Title" errors={errors} />
        <Select name="genreId" label="Genre" options={genres} errors={errors} />
        <Input
          name="numberInStock"
          label="Number in Stock"
          type="number"
          errors={errors}
        />
        <Input name="dailyRentalRate" label="Rate" errors={errors} />
        <CancelButton />
        <Button label="Submit" />
      </form>
    </div>
  )
}
/*
import { useHistory } from "react-router-dom";

export const Item = () => {
    let history = useHistory();
    return (
        <>
          <button onClick={() => history.goBack()}>Back</button>
        </>
    );
};
import { getMovie, saveMovie } from '../../infra/services/movieService'

class MovieForm extends Form {
  state = {
    data: {
      title: '',
      genreId: '',
      numberInStock: '',
      dailyRentalRate: ''
    },
    genres: [],
    errors: {}
  }

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().min(2).max(100).label('Title'),
    genreId: Joi.string().required().label('Genre'),
    numberInStock: Joi.number().required().min(0).max(100).label('Number in Stock'),
    dailyRentalRate: Joi.number().required().min(0).max(10).label('Daily Rental Rate')
  }

  async populateGenres() {
    const genres = await getGenres()
    this.setState({ genres: genres })
  }

  async populateMovie() {
    try {
      const movieId = this.props.match.params.id
      if (movieId === 'new') return

      const movie = await getMovie(movieId)
      this.setState({ data: this.mapToViewModel(movie) })
    } catch (ex) {
      if (ex.response && ex.response.status === 404) this.props.history.replace('/not-found')
    }
  }

  async componentDidMount() {
    await this.populateGenres()   
    await this.populateMovie()    
    console.log('---- here --- ' + JSON.stringify(this.state))
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    }
  }

  doSubmit = async () => {
    await saveMovie(this.state.data)
    this.props.history.push('/movies')
  }

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
