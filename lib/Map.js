'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assocPath = require('ramda/src/assocPath');

var _assocPath2 = _interopRequireDefault(_assocPath);

var _clone = require('ramda/src/clone');

var _clone2 = _interopRequireDefault(_clone);

var _path = require('ramda/src/path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Map = (function () {
  function Map(obj) {
    _classCallCheck(this, Map);

    if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') {
      throw new TypeError(obj, 'is not an object');
    }

    this.obj = obj;
  }

  _createClass(Map, [{
    key: 'clone',
    value: function clone() {
      return new Map(this.toObject());
    }
  }, {
    key: 'toObject',
    value: function toObject() {
      return (0, _clone2.default)(this.obj);
    }
  }, {
    key: 'set',
    value: function set(prop, val) {
      var obj = this.toObject();

      obj[prop] = val;

      return new Map(obj);
    }
  }, {
    key: 'get',
    value: function get(prop) {
      return this.obj[prop];
    }
  }, {
    key: 'update',
    value: function update(prop, updater) {
      return this.set(prop, updater(this.get(prop)));
    }
  }, {
    key: 'setIn',
    value: function setIn(propPath, val) {
      var obj = (0, _assocPath2.default)(propPath, val, this.obj);

      return new Map(obj);
    }
  }, {
    key: 'getIn',
    value: function getIn(propPath) {
      return (0, _path2.default)(propPath, this.obj);
    }
  }]);

  return Map;
})();

exports.default = Map;