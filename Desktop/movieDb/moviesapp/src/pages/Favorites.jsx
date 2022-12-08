import React from "react";
import Card from "../components/Card";
import "./Favorites.css";
const Favorites = ({ favorites }) => {
  return (
    <div className="Favorites">
      <div className="favoriteList">
        {favorites.length ? (
          favorites.map((movie) => <Card key={movie.id} movie={movie} />)
        ) : (
          <p>There is no favorite movies yet.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
