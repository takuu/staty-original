'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');

var objectIdify = function(json) {

  var result = {};
  _.map(Object.keys(json), (key) => {
    var property = _.cloneDeep(json[key]);
    var isObjectId = property.type && property.ref && property.type === 'id' && typeof property.ref === 'string';
    if (isObjectId) {
      property = _.assign({}, property, {type: Schema.ObjectId});
    }
    result[key] = property;
  });

  return result;
};

export default {
  objectIdify
};
