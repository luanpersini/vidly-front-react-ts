import { AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Input from '../../components/form/input'
import { Title } from '../../components/template/page-title'
import { getGenres } from '../../infra/services/genreService'
import { GenreParams, Page } from '../../protocols'

interface FormErrors {
  name: string
  message: string
}

export function MovieForm(props: Page ) {
  // const [errors, setErrors] = React.useState<FormErrors[]>([{name: "Email", message: "Email is required"},{name: "Title", message: "Title is required"}]);
  const allGenres = { _id: '', name: 'All Genres' }
  const [genres, setGenres] = useState<AxiosResponse | null | GenreParams[]>([allGenres])
  const [errors, setErrors] = React.useState<FormErrors[]>([{ name: 'Email', message: 'Email is required' }])

  let title = props.title
  const {id: movieId} = useParams<{ id: string }>()
  if (movieId === 'new') {title = "New Movie"}

  useEffect(() => {
    (async () => {
      const data = await getGenres()
      const genres = [{ _id: "", name: "All Genres" }, ...data];
      setGenres(genres)          
      // const movies = await getMovies()
      // setAllMovies(movies) 
    })()
  }, [])

  function handleSubmit() {
    const a = 'lala'
  }
  console.log('111' + JSON.stringify(errors))

  return (
    <div>
      <Title title={title} />
      <form onSubmit={handleSubmit}>
        <Input name="title" label="Title" errors={errors} />
        <Input name="numberInStock" label="Number in Stock" type="number" errors={errors} />
        <Input name="dailyRentalRate" label="Rate" errors={errors} />
      </form>
    </div>
  )
}
//  {this.renderSelect('genreId', 'Genre', this.state.genres)}
/*
import Joi from 'joi-browser'
import React from 'react'
import { Form } from '../../components/form'
import { getGenres } from '../../infra/services/genreService'
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
