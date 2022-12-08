import React, { useEffect, useState } from "react";
import "./Filter.css";
const Filter = ({ handleGenreChange, handleSort }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=fe4b67a5e74c73cef5629bd18acc65be&page=3"
    )
      .then((res) => res.json())
      .then((data) => setGenres([...data.genres]));
  }, []);

  return (
    <div className="filter-container">
      <div>Filter:</div>
      <div className="filters">
        <div className="filterDiv">
          <select
            name="genre-list"
            id="genre-list"
            onChange={handleGenreChange}
          >
            <option value="">All</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        <div className="filterDiv">
          <select name="genre-list" id="genre-list" onChange={handleSort}>
            <option value="rating">Rating</option>
            <option value="year">Year</option>
            <option value="alphabetically">Alphabetically</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filter;
