'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
import stat from '../../../shared/models/stat';
import utils from '../../utils';

/**
 * Stat Schema
 */
var StatSchema = new Schema(utils.mongooseify(stat));
/*var StatSchema = new Schema({
  player: { type: Schema.ObjectId, ref: 'Player' },
  league: { type: Schema.ObjectId, ref: 'League' },
  season: {type: Schema.ObjectId, ref: 'Season'},
  division: { type: Schema.ObjectId, ref: 'Division' },
  team: { type: Schema.ObjectId, ref: 'Team' },
  vsTeam: { type: Schema.ObjectId, ref: 'Team' },
  game: { type: Schema.ObjectId, ref: 'Game' },
  points: {type: Number, default: -1},
  assists: {type: Number, default: -1},
  offensiveRebounds: {type: Number, default: -1},
  defensiveRebounds: {type: Number, default: -1},
  totalRebounds: {type: Number, default: -1},
  steals: {type: Number, default: -1},
  blocks: {type: Number, default: -1},
  fieldGoalsAttempted: {type: Number, default: -1},
  fieldGoalsMade: {type: Number, default: -1},
  threePointsAttempted: {type: Number, default: -1},
  threePointsMade: {type: Number, default: -1},
  freeThrowsAttempted: {type: Number, default: -1},
  freeThrowsMade: {type: Number, default: -1},
  fouls: {type: Number, default: -1},
  turnovers: {type: Number, default: -1},
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});*/

module.exports = mongoose.model('Stat', StatSchema);
