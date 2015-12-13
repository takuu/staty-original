'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Game Schema
 */
  // Adding homeScore and awayScore for a variety of reasons
  // the main being of the possibilty of the cumulative points
  // and final score being out of sync.
var GameSchema = new Schema({

  date: { type: Date, default: Date.now },
  time: String,
  league: { type: Schema.ObjectId, ref: 'League' },
  season: {type: Schema.ObjectId, ref: 'Season'},
  division: { type: Schema.ObjectId, ref: 'Division'},
  homeTeam: { type: Schema.ObjectId, ref: 'Team' },
  awayTeam: { type: Schema.ObjectId, ref: 'Team' },
  homeScore: Number,
  awayScore: Number,
  location: { type: Schema.ObjectId, ref: 'Location'},
  isUpdated: {type: Boolean, default: false},
  created: { type: Date, default: Date.now},
  updated: { type: Date, default: Date.now}
});

module.exports = mongoose.model('Game', GameSchema);
