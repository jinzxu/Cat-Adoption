import React from "react";
// import bootstrap
import "bootstrap/dist/css/bootstrap.css";
// import navlink
import { NavLink } from "react-router-dom";
import Logo from "../assets/Grazioso_Salvare_Logo.png";
import "../styles/navigation.css";

// Display the navigation bar
export default function Navigation() {
  return (
    <div>
      <nav className="navbar">
        <NavLink className="navbar-logo" to="/">
          <img style={{ width: 15 + "%" }} src={Logo} alt="logo"></img>
        </NavLink>
        <ul>
          <li className="dropdown">
            <button className="dropbtn">
              Search and Rescue Dogs
              <i className="fa fa-caret-down" />
            </button>
            <div className="dropdown-content">
              <NavLink className="nav-link" to="/">
                All Search and Rescue
              </NavLink>
              <NavLink className="nav-link" to="/mountain">
                Mountain Rescue
              </NavLink>
              <NavLink className="nav-link" to="/water">
                Water Rescue
              </NavLink>
              <NavLink className="nav-link" to="/disaster">
                Disaster Rescue
              </NavLink>
            </div>
          </li>
          <li>
            <NavLink className="nav-link" to="/all">
              All Animals
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/create">
              Add Animal
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
