'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Player Schema
 */
var LocationSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please enter an location name(Ex: Lincoln High School)',
    trim: true
  },
  address1: String,
  address2: String,
  city: String,
  zipCode: String,
  state: String,
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }

});


module.exports = mongoose.model('Schedule', ScheduleSchema);
