import React from 'react';

const NavBar = ({ auth, logout }) => {
  return (
    <nav className="nav-bar">
      <button className="nav-button">Home</button>
      <button className="nav-button">About</button>
      <button className="nav-button">Rules</button>
      
      {/* Display user information and logout button */}
      {auth && (
        <div className="user-info">
          <span>Logged in as:</span>
          <span className="name"> {auth.name}</span>
          <button className="logout" type="button" onClick={logout}>Logout</button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
