'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RegulationSchema = new Schema({
  name: {type: String, required: 'Please enter a regulation name'},
  league: { type: Schema.ObjectId, ref: 'League' },
  title: {type: String},
  markdown: {type: String},
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Regulation', RegulationSchema);
