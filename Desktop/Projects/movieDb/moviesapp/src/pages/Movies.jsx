import React, { useMemo } from "react";
import Card from "../components/Card";
import Filter from "../components/Filter";
import Loading from "../components/Loading";

function Movies({
  allMovies,
  selectedGenre,
  filterByGenres,
  handleGenreChange,
  handleSort,
  sortValue,
  isLoading,
  errorMessage,
}) {
  let filteredList = useMemo(filterByGenres, [selectedGenre, allMovies]);

  const sortBySelectValue = () => {
    return filteredList.sort((a, b) => {
      if (sortValue === "year") {
        return a.release_date < b.release_date
          ? 1
          : a.release_date > b.release_date
          ? -1
          : 0;
      }
      if (sortValue === "rating") {
        return a.popularity < b.popularity
          ? 1
          : a.popularity > b.popularity
          ? -1
          : 0;
      }
      if (sortValue === "alphabetically") {
        return a.title > b.title ? 1 : a.title < b.title ? -1 : 0;
      }
    });
  };

  useMemo(sortBySelectValue, [sortValue, filteredList]);

  return (
    <div className="movies">
      <Filter
        selectedGenre={selectedGenre}
        handleGenreChange={handleGenreChange}
        handleSort={handleSort}
      />
      <div className="moviesList">
        {isLoading ? (
          <Loading />
        ) : (
          filteredList.map((movie) => <Card key={movie.id} movie={movie} />)
        )}
        {errorMessage && <div className="error">{errorMessage}</div>}
      </div>
    </div>
  );
}

export default Movies;
