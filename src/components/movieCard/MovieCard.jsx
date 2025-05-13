import styles from "./MovieCard.module.css";
import noPoster from "../../assets/images/noPoster.png";

export default function MovieCard({ movie }) {
  return (
  <div className={styles.movieCard}>
    <img
      src={movie.Poster !== "N/A" ? movie.Poster : noPoster}
      alt={movie.Title}
      className={styles.movieImage}
    />
    <h3 className={styles.movieTitle}>{movie.Title} ({movie.Year})</h3>
  </div>
  );
}
