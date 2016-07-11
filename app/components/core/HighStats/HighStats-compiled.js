'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _statParser = require('../../../utils/statParser');

var _statParser2 = _interopRequireDefault(_statParser);

var _helpers = require('../../../utils/helpers');

var _helpers2 = _interopRequireDefault(_helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import './styles.css';
if (process.env.BROWSER) require('./styles.css');


var HighStats = function HighStats(_ref) {
  var highs = _ref.highs;
  var title = _ref.title;
  var assists = highs.assists;
  var points = highs.points;
  var blocks = highs.blocks;
  var rebounds = highs.rebounds;
  var steals = highs.steals;


  var foo = _react2.default.createElement(
    'div',
    { className: 'high-container' },
    _react2.default.createElement(
      'div',
      { className: 'title' },
      title || 'Season Highs'
    ),
    _react2.default.createElement(
      'ul',
      { className: 'list-group' },
      _lodash2.default.map(highs, function (item, key) {
        var title = _helpers2.default.camelCaseToTitle(key);
        return _react2.default.createElement(
          'li',
          { className: 'list-group-item' },
          _react2.default.createElement(
            'div',
            { className: 'high-title' },
            title
          ),
          _react2.default.createElement(
            'div',
            { className: 'high-stat' },
            item
          )
        );
      })
    )
  );
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'div',
      { className: 'title' },
      title || 'Season Highs'
    ),
    _react2.default.createElement(
      'div',
      { className: 'high-container' },
      _lodash2.default.map(highs, function (item, key) {
        var title = _helpers2.default.camelCaseToTitle(key);
        return _react2.default.createElement(
          'div',
          { className: 'high-block' },
          _react2.default.createElement(
            'div',
            { className: 'high-title' },
            title
          ),
          _react2.default.createElement(
            'div',
            { className: 'high-stat' },
            item
          )
        );
      })
    )
  );
};
HighStats.propTypes = {
  highs: _react.PropTypes.object
};

HighStats.defaultProps = {
  highs: {}
};

exports.default = HighStats;

//# sourceMappingURL=HighStats-compiled.js.map