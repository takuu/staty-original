'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Schedule Schema
 */
var ScheduleSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please enter an player name',
    trim: true
  },
  games: [{type: Schema.ObjectId, ref: 'Game'}],
  division: { type: Schema.ObjectId, ref: 'Division'},
  league: {type: Schema.ObjectId, ref: 'League'},
  season: {type: Schema.ObjectId, ref: 'Season'},
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }

});


module.exports = mongoose.model('Schedule', ScheduleSchema);
