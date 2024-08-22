import React from 'react';
import '../styles/Header.css';

import home from '../images/homeicon.svg';
import friends from '../images/friendsicon.gif';

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
          <span><img src={home} width={20}/></span>
        </div>
        <div className="header__option">
          <span><img src={friends} width={40}/></span>
        </div>
        <div className="header__option">
          <span>Me</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
