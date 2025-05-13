import MovieCard from "../movieCard/MovieCard"; // Importamos el componente MovieCard
import styles from "../movieList/MovieList.module.css"; // Importamos el archivo de estilos

export default function CardList({ movies,error }) {
  return (
    <div className={styles.cardListContainer}>
      <h2>Films found</h2>
      <div className={styles.cardList}>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))
        ) : (
          error && <p>{error}</p>
        )}
      </div>
    </div>
  );
}
