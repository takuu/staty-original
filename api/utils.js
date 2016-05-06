'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');

let mongooseify = function (json) {
  let result = {};
  _.map(Object.keys(json), (key) => {
    let type;
    let property = _.cloneDeep(json[key]);
    switch (property.type) {
      case 'id':
        type = Schema.ObjectId;
        break;
      case 'number':
        type = Number;
        break;
      case 'string':
        type = String;
        break;
      case 'date':
        type = Date;
        break;
      case 'buffer':
        type = Buffer;
        break;
      case 'boolean':
        type = Boolean;
        break;
      case 'array':
        type = [];
        break;
      default:
        break;

    }
    result[key] = _.assign({}, property, {type: type});
  });

  return result;
};

export default {
  mongooseify
};
