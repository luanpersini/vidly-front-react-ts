import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ListGroup from '../../components/common/listGroup'
import Pagination from '../../components/common/pagination'
import SearchBox from '../../components/searchBox'
import { Title } from '../../components/template/page-title'
import { getGenres } from '../../infra/services/genreService'
import { getMovies } from '../../infra/services/movieService'
import { GenreParams } from '../../protocols/genre'
import { MovieParams } from '../../protocols/movie'
import { Page } from '../../protocols/page'
import { UserParams } from '../../protocols/user'
import { paginate } from '../../utils/paginate'
import MoviesTable from './moviesTable'

const Movies: React.FC<Page & {user: UserParams}> = props => {
  
  type SortColumnParams = {
    path: string
    order: 'asc' | 'desc'
  }
  const user = props.user
  const allGenres = { _id: '', name: 'All Genres' }
  const [genre, setGenre] = useState<GenreParams>(allGenres)
  const [genres, setGenres] = useState<null | GenreParams[]>([allGenres])
  // const [genres, setGenres] = useState<AxiosResponse | null | GenreParams[]>([allGenres])
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
      const data = await getGenres()
      const genres = [{ _id: "", name: "All Genres" }, ...data];
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
    <div> 
      <Title title={props.title} />
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
    </div>
  )
}

export default Movies