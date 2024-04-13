const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname : String,
  lastname : String,
  number : Number,
  username : String,
  email : String,
  password : String
});

const USER = mongoose.model('user', userSchema);

module.exports = USER