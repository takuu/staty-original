'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Season Schema
 */
var SeasonSchema = new Schema({
  name: {
    type: String,
    default: '',
    unique: true,
    required: 'Please enter a season name',
    trim: true
  },
  active: {type: Boolean, default: false},
  disabled: {type: Boolean, default: false},
  league: { type: Schema.ObjectId, ref: 'League' },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Season', SeasonSchema);
