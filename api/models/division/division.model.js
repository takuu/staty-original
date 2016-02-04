'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Division Schema
 */

var DivisionSchema = new Schema({
  name:{type: String, required: 'Please enter a division name'},
  league: { type: Schema.ObjectId, ref: 'League' },
  season: { type: Schema.ObjectId, ref: 'Season'},
  strengthLevel: Number,
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, default: Date.now },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Division', DivisionSchema);
