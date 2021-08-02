import React, { useEffect, useState } from "react";
import ListGroup from "../components/common/listGroup";
import getGenres from "../services/fakeGenreService";

function Movies (){ 
  const [genres,setGenres] = useState([]); 
  const [genre,setGenre] = useState({});
      
  useEffect(async () => {    
    const genres = await getGenres();    
    setGenres( genres );       
  }, [])

  useEffect(async () => {    
     console.log(`Você selecionou ${genre.name}` );       
  }, [genre])
    
  const handleGenreSelect = genrex => {
    setGenre( genrex)    
  };

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            selectedItem={genre}
            onItemSelect={handleGenreSelect}
          />
        </div>        
      </div>
    );
 
}

export default Movies;