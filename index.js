const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const config = require('./config');

const PORT = config.PORT;

// ---- Connect to mongodb here ----

// --- connect to your collection ---

// Handle data in a nice way
app.use(express.json());
const publicURL = path.resolve(`${__dirname}/public`);

// Set your static server
app.use(express.static(publicURL));

// Set your static html file
app.get("/", (req, res) => {
  res.sendFile( path.resolve(__dirname + "/views/index.html"))
});

// ---- ADD YOUR API ENDPOINTS HERE ----

// Start listening
app.listen(PORT, () => {
  console.log(`see the magic: http://localhost:${PORT}`);
})