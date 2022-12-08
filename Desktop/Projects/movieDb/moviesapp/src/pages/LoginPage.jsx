import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signin } = useAuth();

  const fromPage = location.state?.from?.pathname || "";

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = e.target.username.value;

    signin(user, () =>
      navigate(fromPage == "" ? "/" : fromPage, { replace: true })
    );
  };

  return (
    <div className="LoginPage">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
