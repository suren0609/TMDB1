import React from "react";
import Card from "./Card";

const Popular = ({ movies, errorMessage, slide, scrl, scrolEnd, scrollX }) => {
  return (
    <div className="Popular">
      <h3>Popular</h3>
      <div className="scrollWin">
        {scrollX !== 0 && (
          <button className="prev" onClick={() => slide(-400)}>
            <i className="fa fa-angle-left"></i>
          </button>
        )}
        <div className="popMovies" ref={scrl}>
          {movies.map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}

          {errorMessage && <div className="error">{errorMessage}</div>}
        </div>
        {!scrolEnd && (
          <button className="next" onClick={() => slide(+400)}>
            <i className="fa fa-angle-right"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default Popular;
