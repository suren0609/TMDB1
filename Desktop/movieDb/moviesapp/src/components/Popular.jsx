import React from "react";
import Card from "./Card";

const Popular = ({ movies, errorMessage }) => {
  return (
    <div className="Popular">
      <h3>Popular</h3>
      <div className="popMovies">
        {movies.map((movie) => (
          <Card key={movie.id} movie={movie} />
        ))}
        {errorMessage && <div className="error">{errorMessage}</div>}
      </div>
    </div>
  );
};

export default Popular;
