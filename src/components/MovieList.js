import React from 'react'
import Movie from './Movie';

const MovieList = ({movies, onSelectMovie}) => {
 
  return (
    <ul className="list list-movies">
        {movies?.map((movie) => (
            <Movie onSelectMovie={onSelectMovie} movie={movie} key={movie.imdbID} />
        ))}
    </ul>
  )
}

export default MovieList