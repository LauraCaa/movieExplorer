import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../components/searchBar/SearchBar";
import MovieList from "../components/movieList/MovieList";
import AsideInfo from "../components/asideInfo/AsideInfo";
import "../assets/styles/styles.css";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = async (query) => {
    const keyword = query.trim() === "" ? "movies" : query;
    const apiKey = process.env.REACT_APP_API_KEY;
    try {
      const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${keyword}`;
      const { data } = await axios.get(url);

      if (data.Response === "True") {
        setMovies(data.Search.slice(0, 10));
        setError(null);
      } else {
        setMovies([]);
        setError("No movies found for this search.");
      }
      setHasSearched(true);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError("An error occurred while fetching the movies. Please try again later.");
    }
      
  };

  useEffect(() => {
    fetchMovies(search);
  }, [search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchMovies(search);
    setSearch("");
  };

  return (
    <div className="appContainer">
      <AsideInfo movies={movies} />
      <main className="mainContent">
        <SearchBar search={search} setSearch={setSearch} handleSubmit={handleSubmit} />
        <MovieList movies={movies} hasSearched={hasSearched} error={error}/>
      </main>
    </div>
  );
}