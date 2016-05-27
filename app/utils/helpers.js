import _ from 'lodash';

/**
 * Decimal adjustment of a number.
 *
 * @param {String}  type  The type of adjustment.
 * @param {Number}  value The number.
 * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
 * @returns {Number} The adjusted value.
 */
function decimalAdjust(type, value, exp) {
  // If the exp is undefined or zero...
  if (typeof exp === 'undefined' || +exp === 0) {
    return Math[type](value);
  }
  value = +value;
  exp = +exp;
  // If the value is not a number or the exp is not an integer...
  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
    return NaN;
  }
  // Shift
  value = value.toString().split('e');
  value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
  // Shift back
  value = value.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
}

export default {
  jsonToQueryString (json = {}) {
    return Object.keys(json).map(function (key) {
      return encodeURIComponent(key) + '=' +
        encodeURIComponent(json[key]);
    }).join('&');
  },
  roundDecimal (value, exp) {
    return decimalAdjust('round', value, exp);
  },

  queryStringToJSON (str = '') {
    var pairs = str.split('&');
    var result = {};
    pairs.forEach(function (pair) {
      pair = pair.split('=');
      result[pair[0]] = decodeURIComponent(pair[1] || '');
    });

    return JSON.parse(JSON.stringify(result));
  },
  doesKeyExistInList (list = [], key = '') {
    let result = _.filter(list, (item) => {
      return !!item[key];
    });
    return !!result.length;
  },
  serverToView (value = '') {
    // parameter should be a primitive
    let result;
    if (typeof value === 'boolean') {
      result = (value) ? 'Yes' : 'No';
    } else if (typeof value === 'string') {
      result = value;
    }
    return result;
  },
  viewToServer (value = '') {
    let result;
    if (value === 'Yes' || value === 'No') {
      result = (value === 'Yes');
    } else {
      result = value;
    }
    return result;
  },
  camelCaseToTitle (camelCase) {
    if (!camelCase) return '';
    var pascalCase = camelCase.charAt(0).toUpperCase() + camelCase.substr(1);
    return pascalCase
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
      .replace(/([a-z])([0-9])/gi, '$1 $2')
      .replace(/([0-9])([a-z])/gi, '$1 $2');
  },
  getObjId (item) {
    return (typeof item === 'object') ? item._id : item;
  }
};
