const { Server } = require('socket.io');
const express = require('express');

// Enable Cookie Sessions
const cookieSession = require('cookie-session');    // Import middleware for client cookie sessions
const session = cookieSession({ name: 'session', keys: ["secret"], sameSite: true }); // Create session configuration

// Create Express App
const app = express();
app.use(express.static("public")); // Serve static files from the "public" directory
app.use(express.json()); // Enable JSON parsing
app.use(session); // Use the session middleware to enable cookie-based sessions

// Handle login: save user to session
app.post("/api/login", (req, res) => {
  const name = req.body.email; // Get the email from the request body
  const user = { id: 1, name }; // Create a user object with an ID and name
  req.session.user = user; // Store the user object in the session
  res.json(user); // Respond with the user object as JSON
});

// Handle favicon request to avoid 404 errors
// app.get("/favicon.ico", (req, res) => {
//   console.log("ico");
//   res.status(204).send(""); // Respond with empty content to favicon requests
// });

// Handle logout: remove user object from session
app.post("/api/logout", (req, res) => {
  console.log("logout:", req.session.user);
  req.session = null; // Clear the session data to log the user out
  res.status(204).send(); // Respond with a status code indicating success
});

// Start Express server
const http = app.listen(8080, () => {
  console.log(`Server running at port: 8080`);
});

// Start WebSocket (WS) Server using socket.io
const io = new Server(http); // Create a new socket.io server instance
const clients = {}; // Object to store connected clients

// Allow socket.io to access session information
const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
io.use(wrap(session));

// Handle WebSocket connections
io.on('connection', client => {
  const session = client.request.session; // Access session information from the client's request
  //const name = session?.user?.name; // Get the user's name from the session, if available
  const name = session && session.user && session.user.name; // Get the user's name from the session, if available


  console.log("Client Connected!", name, " : ", client.id);
  client.emit("system", `Welcome ${name}`); // Emit a welcome message to the connected client
  client.broadcast.emit('system', `${name} has just joined`); // Broadcast a message to all other clients

  clients[name] = client.id; // Add the client's ID to the clients object for tracking
  console.log(clients);

  // Handle incoming messages
  client.on('message', data => {
    console.log(data);
    const { text, to } = data;
    const from = name;

    if (!to) {
      client.broadcast.emit('public', { text, from }); // Broadcast public messages to all clients
      return;
    }

    const id = clients[to];
    console.log(`Sending message to ${to}:${id}`);
    io.to(id).emit("private", { text, from }); // Send private messages to specific client
  });

  // Handle client disconnection
  client.on("disconnect", () => {
    console.log("Client Disconnected", name, " : ", client.id);
    client.broadcast.emit('system', `${name} has just left`); // Notify other clients when a user disconnects
    delete clients[name]; // Remove the client's ID from the clients object
  });
});