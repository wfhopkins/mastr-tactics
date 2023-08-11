import {useState} from 'react';
import axios from 'axios';
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import './styles/App.css';
import Lore from './components/Lore';


export default function App() {
  //State to manage authentication status
  const [auth, setAuth] = useState(null);

  // Function to log in the user on the server
  const login = function(username, password) {
    console.log("TESTING")
    axios.post("api/login", {username, password})
      .then(res => {
        console.log("Res.data", res.data);
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

  
  return (
    <div className="App">
      {/* <h1>MASTR-TACTICS</h1> */}
      
      {/* Gateway to the welcome page */}
      {auth &&
        <>
          <Welcome auth={auth} logout={logout} /> 
        </>
      }

       {/* entrance login screen */}
      {!auth &&
        <Login login={login} />
      
      }

    </div >
  );
}