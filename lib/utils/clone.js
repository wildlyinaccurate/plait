'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = clone;

var _is = require('ramda/src/is');

var _is2 = _interopRequireDefault(_is);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function clone(obj) {
  var newObj = Array.isArray(obj) ? [] : {};

  for (var k in obj) {
    var val = obj[k];

    if ((0, _is2.default)(Object, val)) {
      if (val.hasOwnProperty('@@Plait/State')) {
        newObj[k] = val.clone();
      } else {
        newObj[k] = clone(val);
      }
    } else {
      newObj[k] = val;
    }
  }

  return newObj;
}
module.exports = exports['default'];