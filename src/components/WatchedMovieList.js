import React from 'react'
import WatchedMovie from './WatchedMovie'

const WatchedMovieList = ({watched,onDeleteWatched}) => {
  return (
    <ul className="list">
    {watched.map((movie) => (
      <WatchedMovie onDeleteWatched={onDeleteWatched}  movie={movie} key={movie.imdbId} />
    ))}
  </ul>
  )
}

export default WatchedMovieList