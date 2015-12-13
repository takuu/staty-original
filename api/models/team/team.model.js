'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Team Schema
 */
var TeamSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please enter a team name',
    trim: true
  },
  league: { type: Schema.ObjectId, ref: 'League' },
  season: { type: Schema.ObjectId, ref: 'Season'},
  division: { type: Schema.ObjectId, ref: 'Division'},
  about: String,
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }

});

module.exports = mongoose.model('Team', TeamSchema);
