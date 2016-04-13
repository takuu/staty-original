var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * User Schema
 */
var UserSchema = new Schema({
  fb: {
    id: String,
    access_token: String,
    firstName: String,
    lastName: String,
    displayName: String,
    email: String,
    profile_image: String
  },
  twitter: {
    id: String,
    token: String,
    username: String,
    displayName: String,
    lastStatus: String
  },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }

});

module.exports = mongoose.model('User', UserSchema);