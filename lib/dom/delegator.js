'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listen = listen;

var _domDelegator = require('dom-delegator/dom-delegator');

var _domDelegator2 = _interopRequireDefault(_domDelegator);

var _events = require('./events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function listen() {
  var delegator = new _domDelegator2.default();

  _events2.default.forEach(function (event) {
    return delegator.listenTo(event);
  });
}