import { useState } from 'react';
import axios from 'axios';
import WebSocketHandler from './components/WebSocketHandler'; // Import WebSocketHandler
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import './styles/App.css';

export default function App() {
  // State to manage authentication status
  const [auth, setAuth] = useState(null);

  // Function to log in the user on the server
  const login = function(username, password) {
    axios.post("api/login", { username, password })
      .then(res => {
        setAuth(res.data);
      })
      .catch(err => {
        console.log("Login:", err.message);
      });
  };

  // Function to log out the user
  const logout = function() {
    axios.post("api/logout", {})
      .then(() => {
        setAuth(null);
      });
  };

  return (
    <div className="App">
      {/* Render the appropriate component based on authentication status */}
      {auth ? (
        <WebSocketHandler>
          <Welcome auth={auth} logout={logout} />
        </WebSocketHandler>
      ) : (
        <Login login={login} />
      )}
    </div>
  );
}
