// 1. Read in your mongoose library
const mongoose = require('mongoose');
// 2. Get the Schema class from mongoose
const Schema = mongoose.Schema;
// 3. Define the database model schema for your records
const schema = new Schema({
  userFeelings: { // holds user input / day
    type: String,
    required: true
  },
  date: { // primary key
    type: String, // Not using default Date; Only weekday/day/month/year are req.
    required: true,
    unique: true, // single record for each day
  },
  status: { // info about covid-19 deaths/infected
    type: Number,
    required: true
  }
  
});

// 4. create a new mongodb model called: "FeelingLog"
const db = mongoose.model('FeelingLog', schema)
// 5. make this model available to your app
module.exports = db;