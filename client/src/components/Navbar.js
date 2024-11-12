import { Link } from "react-router-dom";
import "../component-styles/Navbar.css";
import friends from "../logos/friendsicon.gif";
import profile from "../logos/profile.png";
import logo from "../logos/logo.png";
import home from "../logos/home.gif";
import chat from "../logos/chat.png";
import { useState, useEffect } from "react";
import Search from "./Search";
import { useAuth } from "../context/UserContext";


export default function Navbar() {
  const { user } = useAuth();

  return (
    <div className="navbarContainer">
      <div className="navbar-left">
        <div className="logo">
          <Link to="/home">
            <img src={logo} alt="Logo" />
            <span>Horde Talk</span>
          </Link>
        </div>
      </div>
      <div className="navbar-center">
        <Search/>
      </div>
      <div className="navbar-right">
        <div className="navbarIcons">
          <div className="navbarIconItem">
            <Link to="/home" >
              <img src={home} alt="Home" className="icon" />
            </Link>
          </div>
          <div className="navbarIconItem">
            <Link to="/networks" >
              <img src={friends} alt="Friends" className="icon" />
            </Link>
          </div>
          {/* <div className="navbarIconItem">
            <Link to="/chat" >
              <img src={chat} alt="Chat" className="icon" />
            </Link>
          </div> */}
          <Link to="/profile" >
            <img
          src= { user?.dp ||"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"}
          alt="User Avatar"
          className="navbarImg"
        />
          </Link>
        </div>
      </div>
    </div>
  );
}
