import React from 'react';
import '../styles/Header.css';

function Header() {
  return (
    <div className="header">
      <div className="header__left">
      <div className='logo'>
        <a href='/'>HordeTalk</a>
        </div>
        <div className="header__search">
          <input type="text" placeholder="Search" />
        </div>
      </div>
      <div className="header__right">
        <div className="header__option">
          <span>Home</span>
        </div>
        <div className="header__option">
          <span>My Friends</span>
        </div>
        <div className="header__option">
          <span>Me</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
