import React from "react";
import { NavLink as Link } from "react-router-dom";
import "./Header.css";

const Logo = () => {
  return (
    <Link className="logo" to="/">
      MOVIESAPP
    </Link>
  );
};

export default Logo;
