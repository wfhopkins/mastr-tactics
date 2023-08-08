import { useState } from 'react';

// Define the Login component
export default function Login(props) {
  // State to manage email and password inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle form submission
  const onSubmit = function(event) {
    event.preventDefault();
    // Call the login function from props if email is provided
    email && props.login(email, password);
  };

  // Render the Login component
  return (
    <div className="login">
      {/* Login form */}
      <form onSubmit={onSubmit}>
        {/* Email input */}
        <p>
          <input
            type="text"
            name="username"
            value={email}
            placeholder="Enter Username or email"
            onChange={event => setEmail(event.target.value)}
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
  );
};