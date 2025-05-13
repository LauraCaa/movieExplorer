import styles from "./SearchBar.module.css";

export default function SearchBar({ search, setSearch, handleSubmit }) {
  return (
    <div>
      <h1 className={styles.title}>Find your favorite movie!!</h1>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search movies..."
        />
        <button type="submit">Search</button>
      </form>
    </div>

  );
}
