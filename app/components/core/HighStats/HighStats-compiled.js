'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _statParser = require('../../../utils/statParser');

var _statParser2 = _interopRequireDefault(_statParser);

var _createLinks = require('../../../utils/createLinks');

var _createLinks2 = _interopRequireDefault(_createLinks);

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
      _lodash2.default.map(highs, function () {
        var item = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        var key = arguments[1];
        var index = arguments[2];

        var title = _helpers2.default.camelCaseToTitle(key);
        var game = item.game;
        var league = item.league;

        var date = game ? new Date(game.date).toDateString() : '';
        var result = game && game.date ? _statParser2.default.getGameResult(item) : '';

        return _react2.default.createElement(
          'div',
          { key: key, className: 'high-block' },
          _react2.default.createElement(
            'div',
            { className: 'high-title' },
            title
          ),
          _react2.default.createElement(
            'div',
            { className: 'high-stat' },
            item[key]
          ),
          _react2.default.createElement(
            'div',
            { className: 'high-result' },
            _react2.default.createElement(
              _reactRouter.Link,
              { to: _createLinks2.default.createGameLink(league, game) },
              result
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'high-date' },
            date
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