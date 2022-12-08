import React from "react";
import { useParams } from "react-router-dom";
import { api_key, img_url } from "../urls";
import { movie_url } from "../urls";
import { useState, useEffect } from "react";
import "./MovieDetails.css";
import Card from "../components/Card";

const MovieDetails = ({ addToFavorites, favorites }) => {
  const [movie, setMovie] = useState({});
  const { id } = useParams();
  const isF = favorites.find((el) => el.id === movie.id);
  const [rec, setRec] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=fe4b67a5e74c73cef5629bd18acc65be`
    )
      .then((res) => res.json())
      .then((data) => setRec(data.results));

    fetch(`${movie_url + id + api_key}`)
      .then((res) => res.json())
      .then((data) => setMovie(data));
  });

  return (
    <div className="details">
      <div className="detailsContainer">
        <div className="detailsPoster">
          <img src={img_url + movie.poster_path} alt="" />
        </div>
        <div className="shortInfo">
          <h5>{movie.title}</h5>
          <p>Relase Date: {movie.release_date}</p>
          <p>Original Language: {movie.original_language}</p>
          <p>Runtime: {movie.runtime}min</p>
          <p>
            Popularity: <br /> {movie.popularity}
          </p>
          <div className="icons">
            {isF ? (
              <i
                className="fa-sharp fa-solid fa-heart"
                onClick={() => addToFavorites(movie)}
              ></i>
            ) : (
              <i
                className="fa-regular fa-heart"
                onClick={() => addToFavorites(movie)}
              ></i>
            )}
          </div>
        </div>
      </div>
      <div className="info">
        <h5> {movie.original_title} </h5>
        <div className="imgAndOverview">
          <img src={img_url + movie.backdrop_path} alt="" />
          <p> {movie.overview} </p>
        </div>
      </div>
      {rec.length ? (
        <div className="rec">
          <h3>Recommendations</h3>
          <div className="popMovies">
            {rec.map((movie) => (
              <Card key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      ) : (
        <p>There are no recommendations.</p>
      )}
    </div>
  );
};

export default MovieDetails;
