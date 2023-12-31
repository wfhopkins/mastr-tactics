import React, { useState } from 'react';
import { otherImages  } from '../assets.js'
import '../styles/Login.css';


// Define the Login component
export default function Login(props) {
  // State to manage username and password inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loginImage = otherImages.loginImage;
  
  // Handle form submission
  const onSubmit = function(event) {
    event.preventDefault();
    // Call the login function from props if username is provided
    username && props.login(username, password);
  };
  
  // Render the Login component
  return (
    <div className="login">
      <div className="login-container">
        <div className="background-image" style={{ backgroundImage: `url(${loginImage})` }}>
          {/* Login form */}
          <form className="login-form" onSubmit={onSubmit}>
            {/* Username input */}
            <p>
              <input
                type="text"
                name="username"
                value={username}
                placeholder="Enter Username"
                onChange={event => setUsername(event.target.value)}
              />
            </p>
            {/* Password input */}
            <p>
              <input
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={event => setPassword(event.target.value)}
              />
            </p>
            {/* Submit button */}
            <p className="submit">
              <button type="submit" name="commit">Login</button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
