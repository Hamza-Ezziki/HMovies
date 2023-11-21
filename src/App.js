import { useState, useEffect } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import { MovieCard } from "./MovieCard";

const API_URL = "http://www.omdbapi.com?apikey=e5970f02";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();
      data.Search ? setMovies(data.Search) : setMovies([]);
    } catch (error) {
      setMovies([]);
    }
  };

  useEffect(() => {
    searchMovies("batman");
  }, []);

  return (
    <div className="app">
      <h1>HamzaMovies</h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            e.target.value === "" &&
              movies.length === 0 &&
              searchMovies("batman");
          }}
          onKeyDown={(e) => {
            e.key === "Enter" && searchTerm && searchMovies(searchTerm);
          }}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => {
            searchTerm && searchMovies(searchTerm);
          }}
        />
      </div>
      <div className="container">
        {movies.length > 0 ? (
          movies.map((movie, i) => {
            return <MovieCard key={movie.imdbID} movie={movie} />;
          })
        ) : (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
