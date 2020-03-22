// 1. Read in your mongoose library
const mongoose = require('mongoose');
// 2. Get the Schema class from mongoose
const Schema = mongoose.Schema;
// 3. Define the database model schema for your todos
const schema = new Schema({
  userFeelings: { // holds user input / day
    type: String,
    required: true
  },
  date: { // primary key
    type: String,
    required: true,
    unique: true, // single record for each day
    index: true,
  },
  status: { // info about covid-19 deaths/infected
    type: Integer,
    required: true
  }
  
});

// 4. create a new mongodb model called: "FeelingLog"
const db = mongoose.model('FeelingLog', schema)
// 5. make this todos model available to your app
module.exports = db;