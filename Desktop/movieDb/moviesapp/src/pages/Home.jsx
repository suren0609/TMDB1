import React, { useMemo } from "react";
import Card from "../components/Card";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";

const Home = ({
  allMovies,

  searchedName,
  handleSearch,
  searchTheMovie,
  errorMessage,
  isLoading,
  moviesPerPage,
  firstMovieIndex,
  lastMovieIndex,
  paginate,
}) => {
  let searchedMovies = useMemo(searchTheMovie, [searchedName, allMovies]);
  const currentMovie = searchedMovies.slice(firstMovieIndex, lastMovieIndex);

  return (
    <div className="Home">
      <div className="searchForm">
        <input
          className="searchInput"
          type="text"
          value={searchedName}
          onChange={handleSearch}
          onSubmit={() => searchTheMovie()}
          placeholder="Search"
        />
      </div>
      <div className="moviesList">
        {isLoading ? (
          <Loading />
        ) : (
          currentMovie.map((movie) => <Card key={movie.id} movie={movie} />)
        )}
        {errorMessage && <div className="error">{errorMessage}</div>}
      </div>
      <Pagination
        allMovies={allMovies}
        moviesPerPage={moviesPerPage}
        paginate={paginate}
        searchedMovies={searchedMovies}
      />
    </div>
  );
};

export default Home;
