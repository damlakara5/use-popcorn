
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Logo from "./components/Logo";
import SearchInput from "./components/SearchInput";
import NumResults from "./components/NumResults";
import ListBox from "./components/ListBox";
import MovieList from "./components/MovieList";
import WatchedMovieList from "./components/WatchedMovieList";
import WatchedSummary from "./components/WatchedSummary";
import Loader from "./components/Loader";
import MovieDetails from "./components/MovieDetails";
import { useMovies } from "./hooks/useMovies";
import { useLocalStorageState } from "./hooks/useLocalStorageState";


/* const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
]; */


export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null)
  const {movies , isLoading, error} = useMovies(query, handleCloseMovie)
  const [watched, setWatched] = useLocalStorageState([], "watched")

/*   const [watched, setWatched] = useState([]);
 */
/*   const [watched, setWatched] = useState(function(){
    const storedValue = localStorage.getItem("watched")
    return JSON.parse( storedValue)
  });

 */
  const handleSelectMovie = (id) => {
    setSelectedId(selectedID => id === selectedID ? null :id)
  }

  function handleCloseMovie () {setSelectedId(null)}

  const handleAddWatched = (movie) => {
    setWatched(watched => [...watched, movie])
  }

  const handleDeleteWatched = (id) => {
    setWatched(watched => watched.filter(movie=> movie.imdbID !==  id))
  }

  

  function ErrorMessage ({message} ) {
    return <p className="error">  <span>⛔</span> {message} </p>
  }

  return (
    <> 
    
    <Navbar > 
      
        <Logo />
        <SearchInput query={query}  setQuery={setQuery} />
        <NumResults movies={movies} /> 
    </Navbar>
    <Main  > 

      {/* reusable   */}
     {/*  <StarRating defaultRating = {3} messages={["Terrible", "Bad","Okay", "Good", "Amazing"]} /> */}
    
        <ListBox   >
{/*           {isLoading ? <Loader /> :<MovieList movies={movies} />   }
 */}         
        {!isLoading && !error && <MovieList onSelectMovie={handleSelectMovie}  movies={movies} />}
        {error && <ErrorMessage  message={error} />}
        {isLoading && <Loader />}
        </ListBox>
        <ListBox>
           { 
            selectedId ? <MovieDetails watched={watched} onAddWatched = {handleAddWatched} onCloseMovie = {handleCloseMovie}  selectedId={selectedId} /> :
          <>
             <WatchedSummary watched={watched} />
            <WatchedMovieList  watched={watched}  onDeleteWatched = {handleDeleteWatched} />
          </>
             }
        </ListBox>
    </Main>
      
    </>
  );
}
