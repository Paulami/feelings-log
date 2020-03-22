const fs = require('fs');
const path = require('path');
const express = require('express');
const config = require('./config');

// read in mongoose library
const mongoose = require('mongoose');

// --- connect to your collection ---
const records = require('./models/record');

const PORT = config.PORT;
const app = express();

// Handle data in a nice way
app.use(express.json());
const publicURL = path.resolve(`${__dirname}/public`);

// Set your static server
app.use(express.static(publicURL));

// ---- Connect to mongodb here ----
// read in the URI to our MongoDB Atlas 
const MONGODB_URI = config.MONGODB_URI;
// Use mongoose to connect to our MongoDB Atlas server
mongoose.connect(MONGODB_URI, {useNewUrlParser: true})
.then(() => {
  console.log("Connected to MongoDB!!");
  // Start listening
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}!!`);
  })
})
.catch((err) => {
  console.log(err);
})

// Set your static html file
app.get("/", (req, res) => {
  res.sendFile( path.resolve(__dirname + "/views/index.html"))
});

// ---- ADD YOUR API ENDPOINTS HERE ----

// GET: "/api/v1/records"
app.get("/api/v1/records", async (req, res) => {
  try{
    const data = await records.find();
    res.json(data);
  } catch(error){
    console.error(error);
    res.json(error);
  }
});

// POST: "/api/v1/records"
app.post("/api/v1/records", async (req, res) => {
  try{
    const newData = {
      userFeelings: req.body.newUserInput,
      date: req.body.date,
      status: req.body.status,
    }
    const data = await records.create(newData); // TODO if record already exist
    res.json(data);
  } catch(error){
    console.error(error);
    res.json(error);
  }
});