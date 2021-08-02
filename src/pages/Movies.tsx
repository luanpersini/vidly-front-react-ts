import React, { useEffect, useState } from 'react'
import ListGroup from '../components/common/listGroup'
import { getGenres } from '../services/fakeGenreService'

function Movies() {
  type GenreParams = {
    _id: string
    name: string
  }
  const [genres, setGenres] = useState<GenreParams[]>([])
  const [genre, setGenre] = useState<GenreParams | undefined>(undefined)

  useEffect(() => {
    (async () => {
      const genres = await getGenres()      
      setGenres(genres)
     })()   

    //  (async () => {
    //   const data = await getGenres()
    //   const genres = [{ _id: "", name: "All Genres" }, ...data];
    //    setGenres(genres)
    //  })()  
  }, [])
  
;
  useEffect(() => {
    if(genre) console.log(`Você selecionou ${genre.name}`)
  }, [genre])

  const handleGenreSelect = (genre: GenreParams) => {
    setGenre(genre)
  }

  return (
    <div className="row">
      <div className="col-3">
        <ListGroup items={genres} selectedItem={genre} onItemSelect={handleGenreSelect} />
      </div>
    </div>
  )
}

export default Movies
