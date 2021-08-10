import React from "react";
import Form from "../../components/common/form";
import { getGenres } from "../../infra/services/genreService";
import { getMovie, saveMovie } from "../../infra/services/movieService";


/// Colocar tudo junto, depois extrair para componentes
// functional components

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    genres: [],
    errors: {}
  };

/*
  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .min(2)
      .max(100)
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate")
  };
*/
  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovie() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;

      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  mapToViewModel(movie: any) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  }

  doSubmit = async () => {
    await saveMovie(this.state.data);
    this.props.history.push("/movies");
  };
  
  opt = [
        { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
        { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
        { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" }
      ];

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.opt)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;

/*
import Joi from 'joi-browser';
import React, { useEffect, useState } from "react";
import Form from "../../components/common/form";
import { getGenres } from "../../infra/services/genreService";
import { getMovie, saveMovie } from '../../infra/services/movieService';
import { GenreParams } from "../../protocols";

const MovieForm: React.FC<any> = props => {
   type DataParams = {
      title: string
      genreId: any
      numberInStock: number
      dailyRentalRate: number
    }

  const [genres, setGenres] = useState<null | GenreParams[]>([])
  const [errors, setErrors] = useState<null | any>({})
  const [movie, setMovie] = useState<null | any>({})
const [data, setData] = useState<null | DataParams>({
  title: "",
  genreId: "",
  numberInStock: 0,
  dailyRentalRate: 0
})

function mapToViewModel(movie: any) {
  return {
    _id: movie._id,
    title: movie.title,
    genreId: movie.genre._id,
    numberInStock: movie.numberInStock,
    dailyRentalRate: movie.dailyRentalRate
  };
}

  useEffect(() => {
    ;(async () => {
      const genres = await getGenres()
      setGenres( genres)
      document.title = props.title  
      const movieId = props.match.params.id;
      if (movieId === "new") return;
      const movie = await getMovie(movieId);
      setMovie(mapToViewModel(movie));    
    })()
  }, [])

  const schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate")
  };


  const doSubmit = async () => {
    await saveMovie(data);
    props.history.push("/movies");
  };
 
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={Form.handleSubmit} >
          {Form.renderInput("title", "Title")}
          {/* {Form.renderSelect("genreId", "Genre", genres)}
          {Form.renderInput("numberInStock", "Number in Stock", "number")}
          {Form.renderInput("dailyRentalRate", "Rate")}
          {Form.renderButton("Save")} }
        </form>
      </div>
    );
  }

export default MovieForm;

*/