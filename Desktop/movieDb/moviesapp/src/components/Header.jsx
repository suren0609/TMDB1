import React from "react";
import "./Header.css";
import Logo from "./Logo";
import Menu from "./Menu";

const Header = () => {
  return (
    <div className="Header">
      <Logo />
      <div className="navigation">
        <input type="checkbox" className="toggleMenu" />
        <div className="burger"></div>
        <Menu />
      </div>
    </div>
  );
};

export default Header;
