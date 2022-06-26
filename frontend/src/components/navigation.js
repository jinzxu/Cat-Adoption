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
          <img style={{ width: 30 + "%" }} src={"https://image.16pic.com/00/36/86/16pic_3686512_s.jpg?imageView2/0/format/png"} alt="logo"></img>
        </NavLink>
        <ul>
          <li className="dropdown">
            <button className="dropbtn">
              Jason Xu (jinzxu@ucalgary.ca)
              <i className="fa fa-caret-down" />
            </button>

          </li>
          <li>
            <NavLink className="nav-link" to="/all">
              All Cats
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to="/create">
              Add Cat
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
