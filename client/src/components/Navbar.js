import { Link } from "react-router-dom";
import "../component-styles/Navbar.css";
import friends from "../logos/friendsicon.gif";
import profile from "../logos/profile.png";
import logo from "../logos/logo.png";
import home from "../logos/home.gif";
import chat from "../logos/chat.png";
import { useState, useEffect } from "react";
import Search from "./Search";

export default function Navbar() {
  const [activeIcon, setActiveIcon] = useState(localStorage.getItem('activeIcon') || '');

  useEffect(() => {
    // Update localStorage whenever activeIcon changes
    if (activeIcon) {
      localStorage.setItem('activeIcon', activeIcon);
    }
  }, [activeIcon]);

  const handleClick = (icon) => {
    if (icon === 'profile') {
      setActiveIcon(''); // Clear active state when profile is clicked
      localStorage.removeItem('activeIcon'); // Remove from localStorage when profile is clicked
    } else {
      setActiveIcon(icon); // Set active state for other icons
    }
  };

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
            <Link to="/home" className={activeIcon === 'home' ? 'active' : ''} onClick={() => handleClick('home')}>
              <img src={home} alt="Home" className="icon" />
            </Link>
          </div>
          <div className="navbarIconItem">
            <Link to="/friends" className={activeIcon === 'friends' ? 'active' : ''} onClick={() => handleClick('friends')}>
              <img src={friends} alt="Friends" className="icon" />
            </Link>
          </div>
          <div className="navbarIconItem">
            <Link to="/chat" className={activeIcon === 'chat' ? 'active' : ''} onClick={() => handleClick('chat')}>
              <img src={chat} alt="Chat" className="icon" />
            </Link>
          </div>
          <Link to="/profile" onClick={() => handleClick('profile')}>
            <img src={profile} alt="Profile" className="navbarImg" />
          </Link>
        </div>
      </div>
    </div>
  );
}
