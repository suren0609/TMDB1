import React from "react";
import "./Pagination.css";

const Pagination = ({ moviesPerPage, paginate, searchedMovies }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(searchedMovies.length / moviesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="Pagination">
      <ul className="paginations">
        {pageNumbers.map((number) => (
          <li
            className="pageItem"
            key={number}
            onClick={() => paginate(number)}
          >
            {number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
