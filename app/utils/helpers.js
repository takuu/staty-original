import _ from 'lodash';

export default {
  jsonToQueryString (json = {}) {
    return Object.keys(json).map(function (key) {
      return encodeURIComponent(key) + '=' +
        encodeURIComponent(json[key]);
    }).join('&');
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
  }
};
