var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * User Schema
 */
var UserSchema = new Schema({
  fb: {
    id: String,
    accessToken: String,
    firstName: String,
    lastName: String,
    displayName: String,
    name: String,
    email: String,
    profileImage: String
  },
  /*twitter: {
    id: String,
    token: String,
    username: String,
    displayName: String,
    lastStatus: String
  },*/
  players: [{type: Schema.ObjectId, ref: 'Player'}],
  // players: [{name: String, players: [{type: Schema.ObjectId, ref: 'Player'}]}],
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }

});

module.exports = mongoose.model('User', UserSchema);