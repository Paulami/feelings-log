const fs = require('fs');
const path = require('path');
const express = require('express');
const config = require('./config');
// read in mongoose library
const mongoose = require('mongoose');

const app = express();

// ---- Connect to mongodb here ----
// read in the URI to our MongoDB Atlas 
const MONGODB_URI = config.MONGODB_URI;
// Use mongoose to connect to our MongoDB Atlas server
mongoose.connect(MONGODB_URI, {useNewUrlParser: true})
.then(() => {
  console.log("Connected to MongoDB!!");
})
.catch((err) => {
  console.log(err);
})

// --- connect to your collection ---

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