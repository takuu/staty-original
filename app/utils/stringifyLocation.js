
var stringifyQuery = function (json = {}) {
  return Object.keys(json).map(function (key) {
    return encodeURIComponent(key) + '=' +
      encodeURIComponent(json[key]);
  }).join('&');
};

export default function stringifyLocation (location) {
  const query = stringifyQuery(location.query);
  debugger;
  return `${location.pathname}${query && `?${query}`}`;
}

