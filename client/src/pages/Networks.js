import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import Navbar from "../components/Navbar";
import "../styles/Networks.css";
import Leftbar from "../components/Leftbar";
import NetworkSearch from "../components/NetworkSearch";

const Networks = () => {
  const { user } = useAuth();
  const [filteredUserList, setFilteredUserList] = useState(user?.networks );

  const fetchSearchResults = (data) => {
    if (data === null) {
      // If data is null, reset to the original list of networks
      setFilteredUserList(user?.networks || []);
    } else {
      setFilteredUserList(data);
    }
};

  useEffect(()=>{
    
    fetchSearchResults(user?.networks)
  },[user])

  return (
    <>
      <Navbar />
      <div className="whole-network-container">
        <div className="leftbar">
          <Leftbar />
        </div>
        <div className="networks-container">
          <h3 className="networks-heading">Networks</h3>
          <NetworkSearch fetchSearchResults={fetchSearchResults} />
          {filteredUserList && (
            <div className="networks-list">
              {filteredUserList.map((e, i) => (
                <Link key={i} to={`/profiles/${e?._id}`}>
                  <div className="network-item">
                    <img src={e?.dp} alt={`${e.fname}'s profile`} />
                    <div className="network-info">
                      <h3>
                        {e.fname} {e.lname}
                      </h3>
                      <p className="bio">{e.bio}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Networks;
