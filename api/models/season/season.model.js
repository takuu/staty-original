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
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, default: Date.now },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Season', SeasonSchema);
