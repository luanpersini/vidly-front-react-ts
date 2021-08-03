import _ from "lodash";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getGenres } from "../services/genreService";
import { deleteMovie, getMovies } from "../services/movieService";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import MoviesTable from "./moviesTable";
import SearchBox from "./searchBox";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" }
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];

    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }

  handleDelete = async movie => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter(m => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleted.");

      this.setState({ movies: originalMovies });
    }
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      searchQuery,
      movies: allMovies
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { user } = this.props;

    if (count === 0) return <p>There are no movies in the database.</p>;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          {user && (
            <Link
              to="/movies/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Movie
            </Link>
          )}
          <p>Showing {totalCount} movies in the database.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;

/*
import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import ListGroup from '../components/common/listGroup'
import Pagination from '../components/common/pagination'
import MoviesTable from '../components/moviesTable'
import { getGenres } from '../services/fakeGenreService'
import { getMovies } from '../services/fakeMovieService'
import { paginate } from '../utils/paginate'

function Movies() {
  
  type GenreParams = {
    _id: string
    name: string
  }
  type MovieParams = {
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

  const [genre, setGenre] = useState<GenreParams | undefined>(undefined)
  const [genres, setGenres] = useState<GenreParams[]>([])
  const [allMovies, setAllMovies] = useState<MovieParams[]>([])
  const [movies, setMovies] = useState<MovieParams[]>([])
  const [pageSize, setPageSize] = useState<number>(5)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [sortColumn, setSortColumn] = useState<SortColumnParams>({
    path: 'title',
    order: 'asc'
  })

  useEffect(() => {
    ;(async () => {
      const genres = await getGenres()
      setGenres(genres)
      const movies = await getMovies()
      setAllMovies(movies)
    })()
  }, [])

  const handleGenreSelect = (genre: GenreParams) => {
    setGenre(genre)
    setCurrentPage(1)
    setSearchQuery('')
  }

  const handleDelete = (movie: MovieParams) => {
    console.log(movie)
  }
  const handleLike = (movie: MovieParams) => {
    const moviesx = [...allMovies]
    const index = moviesx.indexOf(movie)
    moviesx[index] = { ...moviesx[index] }
    moviesx[index].liked = !moviesx[index].liked
    setAllMovies(moviesx)
  }

  type SortColumnParams = {
    path: string
    order: 'asc' | 'desc'
  }
  
  const handleSort = (sortColumn: SortColumnParams) => {
    setSortColumn(sortColumn)
  }

  const handlePageChange = (page: number) => {
    // setCurrentPage(page)
    // console.log(page);
    
  }
  
  function getPagedData() {   
  
    let filtered = allMovies

    if (searchQuery) filtered = allMovies.filter((m) => m.title.toLowerCase().startsWith(searchQuery.toLowerCase()))
    else if (genre && genre._id) filtered = allMovies.filter((m) => m.genre._id === genre._id)

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])

    const paginatedMovies = paginate(sorted, currentPage, pageSize)

    return { totalCount: filtered.length, data: paginatedMovies }
  }

  const { totalCount, data: paginatedMovies } = getPagedData()
  
  useEffect(() => {
    setMovies(paginatedMovies)
  }, [paginatedMovies])

  return (
    <div className="row">
      <div className="col-3">
        <ListGroup items={genres} selectedItem={genre} onItemSelect={handleGenreSelect} />
      </div>
      <div className="col">
        <p>Showing {totalCount} movies in the database.</p>
        <MoviesTable
          movies={movies}
          sortColumn={sortColumn}
          onLike={handleLike}
          onDelete={handleDelete}
          onSort={handleSort}
        />
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}

export default Movies

*/
