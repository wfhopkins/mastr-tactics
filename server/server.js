const { Server } = require('socket.io');
const express = require('express');
const cors = require('cors');
// import { Player, Deck, Hand, Card, Collection } from 'cardgame-class'

// Enable Cookie Sessions
const cookieSession = require('cookie-session');    // Import middleware for client cookie sessions
const session = cookieSession({ name: 'session', keys: ["secret"], sameSite: true }); // Create session configuration

// Create Express App
const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.static("public")); // Serve static files from the "public" directory
app.use(express.json()); // Enable JSON parsing
app.use(session); // Use the session middleware to enable cookie-based sessions

// Handle login: save user to session
app.post("/api/login", (req, res) => {
  const name = req.body.username; // Get the username from the request body
  const user = { id: 1, name }; // Create a user object with an ID and name
  req.session.user = user; // Store the user object in the session
  res.json(user); // Respond with the user object as JSON
});

// Just to avoid 404 errors
app.get("/favicon.ico", (req, res) => {
  console.log("ico");
  res.status(204).send("");
});

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
const io = new Server(http, {
  cors: {
    origin: 'http://localhost:3000', // Allow requests from your React client
    methods: ['GET', 'POST'],
    credentials: true,
  }
}); // Create a new socket.io server instance
const clients = {}; // Object to store connected clients
const readyPlayers = []; // Array to store players who click play
// Allow socket.io to access session information
const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
io.use(wrap(session));

// Handle WebSocket connections
io.on('connection', client => {
  const session = client.request.session; // Access session information from the client's request
  const name = session && session.user && session.user.name; // Get the user's name from the session, if available
  console.log("Client Connected!", name, " : ", client.id);
  //client.emit("system", `Welcome ${name}`); // Emit a welcome message to the connected client
  //client.broadcast.emit('system', `${name} has just joined`); // Broadcast a message to all other clients

  clients[name] = client.id; // Add the client's ID to the clients object for tracking
  console.log('these are the websocket client: ' ,clients);

  // Handle incoming messages
  client.on('privateMessage', (message) => {
    const { text, from, to } = message;
    const recipientId = clients[to];

    if (recipientId) {
      io.to(recipientId).emit('privateMessage', { text, from });
    }
  });

  client.on('readyToPlay', () => {

    console.log('Ready to play event received');
    if (!readyPlayers.includes(name)) {
      readyPlayers.push(name);
      
      if (readyPlayers.length === 1) {
        io.to(clients[name]).emit('waitingForOpponent');
        console.log(readyPlayers);
        console.log("just sent waitingForOpponent to front end" , name);
      } else if (readyPlayers.length === 2) {
        const player1 = readyPlayers[0];
        const player2 = readyPlayers[1];

        console.log('game begginning between ',player1 + ' and ' , player2);

        io.to(clients[player1]).emit('gameStart', player2); // Send opponent's name
        io.to(clients[player2]).emit('gameStart', player1); // Send opponent's name
        readyPlayers.splice(0, 2); // Remove the players who started the game
      }
    }
  });

 

  // Handle client disconnection
  client.on("disconnect", () => {
    console.log("WebSocket Client Disconnected", name, " : ", client.id);
    //client.broadcast.emit('system', `${name} has just left`); // Notify other clients when a user disconnects
    delete clients[name]; // Remove the client's ID from the clients object
  });
});