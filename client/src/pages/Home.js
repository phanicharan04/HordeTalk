import React from 'react';
import '../styles/Home.css';
import Navbar from '../components/Navbar';
import Leftbar from './../components/Leftbar';
import Rightbar from './../components/Rightbar';
import Feed from './../components/Feed';
import Addpost from './../components/Addpost';

const Home = () => {
  return (
    <>
    <Navbar/>
      <div className="home-container">
        <div className="leftbar">
          <Leftbar />
        </div>
        <div className="feed-section">
          <Addpost />
          <Feed />
        </div>
        <div className="rightbar">
          <Rightbar />
        </div>
      </div>
    </>
  );
};

export default Home;
