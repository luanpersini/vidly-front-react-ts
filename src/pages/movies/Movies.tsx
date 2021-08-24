import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ListGroup, Pagination, SearchBox } from '../../components/common'
import { Title } from '../../components/template'
import { getGenres, getMovies } from '../../infra/services'
import { GenreParams, MovieParams, Page, UserParams } from '../../protocols'
import { paginate } from '../../utils/paginate'
import MoviesTable from './moviesTable'

// const Movies: React.FC<Page & {user: UserParams}> = props => {
export function Movies(props: Page & { user: UserParams }) {
  type SortColumnParams = {
    path: string
    order: 'asc' | 'desc'
  }
  const user = props.user
  const allGenres = { _id: '', name: 'All Genres' }
  const [genre, setGenre] = useState<GenreParams>(allGenres)
  const [genres, setGenres] = useState<GenreParams[]>([allGenres])
  const [allMovies, setAllMovies] = useState<MovieParams[]>([])
  const [pageSize, setPageSize] = useState<number>(5)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [sortColumn, setSortColumn] = useState<SortColumnParams>({
    path: 'title',
    order: 'asc'
  })

  useEffect(() => {
    (async () => {
      const data = await getGenres()
      const genres = [{ _id: '', name: 'All Genres' }, ...data]
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

    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      )
    else if (genre && genre._id)
      filtered = allMovies.filter((m) => m.genre._id === genre._id)

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
          <ListGroup
            items={genres}
            selectedItem={genre}
            onItemSelect={handleGenreSelect}
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
