import React from 'react';

const NavBar = ({ auth, logout, onLoreButtonClick, onAboutButtonClick, onRulesButtonClick }) => {
  return (
    <nav className="nav-bar">
      {/* <button className="nav-button" onClick={} */}
      <button className="nav-button" onClick={onRulesButtonClick}>Rules</button>
      <button className="nav-button" onClick={onAboutButtonClick}>About</button>
      <button className="nav-button" onClick={onLoreButtonClick}>Lore</button> {/* Add Lore button and onClick event */}
      
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







