import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ListGroup from '../components/common/listGroup'
import Pagination from '../components/common/pagination'
import MoviesTable from '../components/movies/moviesTable'
import SearchBox from '../components/searchBox'
import { Page } from '../protocols/page'
import { UserParams } from '../protocols/user'
import { getGenres } from '../services/fakeGenreService'
import { getMovies } from '../services/fakeMovieService'
import { paginate } from '../utils/paginate'

const Movies: React.FC<Page & {user: UserParams}> = props => {
      
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

  type SortColumnParams = {
    path: string
    order: 'asc' | 'desc'
  }
  const user = props.user
  const allGenres = { _id: '', name: 'All Genres' }
  const [genre, setGenre] = useState<GenreParams>(allGenres)
  const [genres, setGenres] = useState<GenreParams[]>([])
  const [allMovies, setAllMovies] = useState<MovieParams[]>([])
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
      // document.title = props.title      
    })()
  }, [])

  const handleGenreSelect = (genre: GenreParams) => {
    setGenre(genre)
    setCurrentPage(1)
    setSearchQuery('')
  }

  const handleLike = (movie: MovieParams) => {
    const moviesx = [...allMovies]
    const index = moviesx.indexOf(movie)
    moviesx[index] = { ...moviesx[index] }
    moviesx[index].liked = !moviesx[index].liked
    setAllMovies(moviesx)
  }

  const handleDelete = (movie: MovieParams) => {
    console.log(movie)
  }

  const handleSearch = (query: string) => {
    setGenre(allGenres)
    setCurrentPage(1)
    setSearchQuery(query)
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

  // ToDo
  // Page Size
  // Delete Movie
  return (
    <div className="row">
      <div className="col-3">
        <ListGroup items={genres} selectedItem={genre} onItemSelect={handleGenreSelect} />
      </div>
      <div className="col">
        {user && (
          <Link to="/movies/new" className="btn btn-primary" style={{ marginBottom: 20 }}>
            New Movie
          </Link>
        )}
        <p>Showing {totalCount} movies in the database.</p>
        <SearchBox value={searchQuery} onChange={handleSearch} />
        <MoviesTable
          movies={paginatedMovies}
          sortColumn={sortColumn}
          onLike={handleLike}
          onDelete={handleDelete}
          onSort={(column: SortColumnParams) => setSortColumn(column)}
        />
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
      </div>
    </div>
  )
}

export default Movies