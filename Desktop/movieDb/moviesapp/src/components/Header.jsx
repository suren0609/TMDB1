import React from "react";
import "./Header.css";
import Logo from "./Logo";
import Menu from "./Menu";

const Header = ({ menuActive, setMenuActive }) => {
  return (
    <div className="Header">
      <Logo />
      <div className="navigation">
        <input
          type="checkbox"
          className="toggleMenu"
          onChange={() => setMenuActive(!menuActive)}
          checked={menuActive && "checked"}
        />
        <div className="burger"></div>
        <div
          className={menuActive ? "nav navActive" : "nav"}
          onClick={() => setMenuActive(false)}
        ></div>
        <Menu setMenuActive={setMenuActive} />
      </div>
    </div>
  );
};

export default Header;
