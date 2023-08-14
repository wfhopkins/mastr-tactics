import React from 'react';
import { otherImages } from '../assets';

const NavBar = ({ auth, logout, onLoreButtonClick, onAboutButtonClick, onRulesButtonClick, onCardsButtonClick, onLeaderboardButtonClick, onLogoButtonClick }) => {
  return (
    <nav className="nav-bar">
      <div id="nav-content">
        <button className="nav-button" onClick={onLogoButtonClick}>
        <img className="nav-logo" src={otherImages.letterhead} alt="Logo" />
        </button>

        <button className="nav-button" onClick={onRulesButtonClick}>Rules</button>
        <button className="nav-button" onClick={onAboutButtonClick}>About</button>
        <button className="nav-button" onClick={onCardsButtonClick}>Cards</button> 
        
       
        <button className="nav-button" onClick={onLoreButtonClick}>Lore</button> 
        <button className="nav-button" onClick={logout}>Logout</button>
        {/* <button className="nav-button" onClick={logout}>Logout</button> */}
        {/* Display user information and logout button */}
        {/* {auth && (
        <div className="user-info">
          <span>Logged in as:</span>
          <span className="name"> {auth.name}</span>
          <button className="logout" type="button" onClick={logout}>Logout</button>
        </div>
      )} */}
      </div>
      
      
    </nav>
  );
};

export default NavBar;







