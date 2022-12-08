import React from "react";
import { NavLink as Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "./Header.css";

const Menu = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { signout } = useAuth();

  return (
    <div className="menu">
      <Link to="/">Home</Link>
      <Link to="/movies">Movies</Link>
      <Link to="/favorites">Favorites</Link>
      {!user ? (
        <Link className="login" to="/login">
          Log in
        </Link>
      ) : (
        <button onClick={() => signout(navigate("/", { replace: true }))}>
          Log Out
        </button>
      )}
    </div>
  );
};

export default Menu;
