import { Link } from "react-router-dom";
import "../component-styles/Navbar.css";
import search from "../logos/search.gif";
import friends from "../logos/friendsicon.gif";
import profile from "../logos/profile.png";
import logo from "../logos/logo.png";
import home from "../logos/home.gif";
import chat from "../logos/chat.png";
import { useState } from "react";

export default function Navbar() {
  const [activeIcon, setActiveIcon] = useState('home');
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
        <div className="searchbar">
          <img src={search} alt="Search" className="searchIcon" />
          <input placeholder="Search" className="searchInput" />
        </div>
      </div>
      <div className="navbar-right">
        <div className="navbarIcons">
          <div className="navbarIconItem">
            <Link to="/home" className={activeIcon === 'home' ? 'active' : ''} onClick={() => setActiveIcon('home')}>
              <img src={home} alt="Home" className="icon" />
            </Link>
          </div>
          <div className="navbarIconItem">
            <Link to="/friends" className={activeIcon === 'friends' ? 'active' : ''} onClick={() => setActiveIcon('friends')}>
              <img src={friends} alt="Friends" className="icon" />
            </Link>
          </div>
          <div className="navbarIconItem">
            <Link to="/chat" className={activeIcon === 'chat' ? 'active' : ''} onClick={() => setActiveIcon('chat')}>
              <img src={chat} alt="Chat" className="icon" />
            </Link>
          </div>
          <Link to="/profile">
          <img src={profile} alt="Profile" className="navbarImg" />
        </Link>
      </div>
    </div>
    </div>
  );
}
