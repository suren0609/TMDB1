import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import MovieDetails from "./pages/MovieDetails";
import Movies from "./pages/Movies";
import { AuthProvider } from "./hoc/AuthProvider";
import { RequireAuth } from "./hoc/RequireAuth";
import Footer from "./components/Footer";
import Popular from "./components/Popular";

function App() {
  const [allMovies, setAllMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState();
  const [searchedName, setSearchedName] = useState("");
  const [sortValue, setSortValue] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [menuActive, setMenuActive] = useState(false);
  const [scrollX, setScrollX] = useState(0);
  const [scrolEnd, setScrolEnd] = useState(false);
  const scrl = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(50);

  const filterByGenres = () => {
    if (!selectedGenre) {
      return allMovies;
    }
    return allMovies.filter((movie) => {
      if (movie.genre_ids.includes(+selectedGenre)) return movie;
    });
  };

  const searchTheMovie = () => {
    if (!searchedName) {
      return allMovies;
    }
    return allMovies.filter((movie) => {
      if (movie.title.toLowerCase().includes(searchedName.toLowerCase()))
        return movie;
    });
  };

  const handleSort = (e) => {
    setSortValue(e.target.value);
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchedName(e.target.value);
  };

  const addToFavorites = (movie) => {
    let newFav;
    const isF = favorites.find((el) => el.id === movie.id);
    if (isF === undefined) {
      setFavorites([movie, ...favorites]);
    } else {
      newFav = favorites.filter((el) => el.id !== movie.id);
      setFavorites(newFav);
    }
  };

  const moviePages = [1, 2, 4, 5, 6, 8, 9, 11];

  const getData = async () => {
    setIsLoading(true);
    try {
      const promises = await Promise.all(
        await moviePages.map(async (page) => {
          const res = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=fe4b67a5e74c73cef5629bd18acc65be&page=${page}`
          );
          const data = await res.json();
          return data;
        })
      );

      let all = [];
      promises.forEach((el) => all.push(...el.results));
      setAllMovies(all);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage("Unable to fetch movie list");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
    getPopular();
  }, []);

  const getPopular = async () => {
    await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=fe4b67a5e74c73cef5629bd18acc65be"
    )
      .then((res) => res.json())
      .then((data) => setMovies(data.results))
      .catch(() => {
        setErrorMessage("Unable to fetch movie list");
        setIsLoading(false);
      });
  };

  const slide = (shift) => {
    scrl.current.scrollLeft += shift;
    setScrollX(scrollX + shift);

    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setScrolEnd(true);
    } else {
      setScrolEnd(false);
    }
  };

  const lastMovieIndex = currentPage * moviesPerPage;
  const firstMovieIndex = lastMovieIndex - moviesPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Router className="App">
      <AuthProvider>
        <Header menuActive={menuActive} setMenuActive={setMenuActive} />
        <Popular
          movies={movies}
          favorites={favorites}
          errorMessage={errorMessage}
          slide={slide}
          scrl={scrl}
          scrolEnd={scrolEnd}
          scrollX={scrollX}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                movies={movies}
                allMovies={allMovies}
                handleSearch={handleSearch}
                searchedName={searchedName}
                searchTheMovie={searchTheMovie}
                errorMessage={errorMessage}
                isLoading={isLoading}
                moviesPerPage={moviesPerPage}
                firstMovieIndex={firstMovieIndex}
                lastMovieIndex={lastMovieIndex}
                paginate={paginate}
              />
            }
          />
          <Route
            path="/movies"
            element={
              <Movies
                allMovies={allMovies}
                selectedGenre={selectedGenre}
                filterByGenres={filterByGenres}
                handleGenreChange={handleGenreChange}
                handleSort={handleSort}
                sortValue={sortValue}
                errorMessage={errorMessage}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <RequireAuth>
                <Favorites favorites={favorites} />
              </RequireAuth>
            }
          />
          <Route
            path="/movie/:id"
            element={
              <MovieDetails
                addToFavorites={addToFavorites}
                favorites={favorites}
                slide={slide}
                scrl={scrl}
                scrolEnd={scrolEnd}
                scrollX={scrollX}
              />
            }
          />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
