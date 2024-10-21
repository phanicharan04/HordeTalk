import React from 'react';
import '../component-styles/Rightbar.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/UserContext';

const Rightbar = () => {
  const { user } = useAuth();
  return (
    <div className="rightbar-container">
      <h3 className="rightbar-heading">Networks</h3>
      {user?.networks && (
        <div className="rightbar-list">
          {user.networks.map((e, i) => (
            <Link to={`/profiles/${e?._id}`} key={i}>
              <div className="rightbar-item">
                <img src={e?.dp} alt={`${e.fname}'s profile`} className="rightbar-dp" />
                <h3 className="rightbar-name">{e.fname}</h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Rightbar;
