// Import necessary dependencies
import {useState} from 'react';
import axios from 'axios';
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import './App.css';

// Define the main App component
export default function App() {
  //State to manage authentication status
  const [auth, setAuth] = useState(null);

  // Function to log in the user on the server
  const login = function(username, password) {
    console.log("TESTING")
    axios.post("api/login", {username, password})
      .then(res => {
        console.log(res.data);
        setAuth(res.data);
      })
      .catch(err => {
        console.log("Login:", err.message);
      });
  };

  //Function to log out the user
  const logout = function() {
    console.log("logout");
    axios.post("api/logout", {})
      .then(() => {
        setAuth(null);
      });
  };

  // Return the JSX for the main App component
  return (
    <div className="App">
      <h1>MASTR-TACTICS</h1>
      
      {/* Show chat and user info if authenticated */}
      {auth &&
        <>
          <span>Logged in as:</span><span className="name"> {auth.name}</span>
          <button className="logout" type="button" onClick={logout}>Logout</button>
          <Welcome />
        </>
      }

       {/* Show login form if not authenticated */}
      {!auth &&
        <Login login={login} />
      }

    </div >
  );
}