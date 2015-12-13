'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Player Schema
 */
var PlayerSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please enter an player name',
    trim: true
  },
  team: { type: Schema.ObjectId, ref: 'Team' },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }

}).index({
    name: 'text'
  });


module.exports = mongoose.model('Player', PlayerSchema);
