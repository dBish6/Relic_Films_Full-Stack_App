import React from "react";
import { Link, NavLink } from "react-router-dom";

// *Design Imports*
import relicFilmsLogo from "../../assets/relic-films-logo-New.webp";
import "./partials.css";

const Navigation = () => {
  return (
    <nav className="navBarContainer">
      <Link to="/home" className="icon">
        <img src={relicFilmsLogo} alt="relic-films-logo-New.webp" />
      </Link>
      <div className="navFlex">
        <div className="left">
          <NavLink to="#">About Us</NavLink>
          <NavLink to="#">Support</NavLink>
        </div>

        {!window.localStorage.getItem("USER_STATUS") ? (
          <div className="right">
            <NavLink to="/login">Login</NavLink>{" "}
          </div>
        ) : (
          <div className="right">
            <NavLink to="/user/profile">Profile</NavLink>
            <img src="" alt="" />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
