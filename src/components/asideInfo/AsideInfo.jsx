import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./AsideInfo.module.css";

export default function AsideInfo({ movies }) {
  const [yearCounts, setYearCounts] = useState({});
  const [directorCounts, setDirectorCounts] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    if (movies.length === 0) return;

    const fetchDetails = async () => {
      const apiKey = process.env.REACT_APP_API_KEY;
      try {
        const responses = await Promise.all(
          movies.map((movie) =>
            axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`)
          )
        );

        const directors = {};
        const years = {};

        responses.forEach(({ data }) => {
          const { Director, Year } = data;
          if (Director) directors[Director] = (directors[Director] || 0) + 1;
          if (Year) years[Year] = (years[Year] || 0) + 1;
          setError(null);
        });

        setDirectorCounts(directors);
        setYearCounts(years);
      } catch (err) {
        setError("An error occurred while fetching movie details. Please try again later.");
      }
    };

    fetchDetails();

  }, [movies]);

  return (
    <aside className={styles.aside}>
      {error && <div className={styles.errorMessage}>{error}</div>}
      <div>
        <h3>Movies by Year</h3>
        <ul>
          {Object.entries(yearCounts).map(([year, count]) => (
            <li key={year}>{year}: {count}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Movies by Director</h3>
        <ul>
          {Object.entries(directorCounts).map(([director, count]) => (
            <li key={director}>{director}: {count}</li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
