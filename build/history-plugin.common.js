/*!
* rete-history-plugin v0.2.1 
* (c) 2022 Vitaliy Stoliarov 
* Released under the MIT license.
*/
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var Action = /*#__PURE__*/function () {
  function Action() {
    _classCallCheck(this, Action);
  }

  _createClass(Action, [{
    key: "undo",
    value: function undo() {}
  }, {
    key: "redo",
    value: function redo() {}
  }]);

  return Action;
}();

function findNewConnection(oldConnection) {
  var input = oldConnection.input,
      output = oldConnection.output;
  return output.connections.find(function (c) {
    return c.input === input;
  });
}

var ConnectionActionHelper = /*#__PURE__*/function () {
  function ConnectionActionHelper(editor, connection) {
    _classCallCheck(this, ConnectionActionHelper);

    this.editor = editor;
    this.connection = connection;
  }

  _createClass(ConnectionActionHelper, [{
    key: "add",
    value: function add() {
      this.editor.connect(this.connection.output, this.connection.input);
    }
  }, {
    key: "remove",
    value: function remove() {
      this.editor.removeConnection(findNewConnection(this.connection));
    }
  }]);

  return ConnectionActionHelper;
}();

var AddConnectionAction = /*#__PURE__*/function (_Action) {
  _inherits(AddConnectionAction, _Action);

  var _super = _createSuper(AddConnectionAction);

  function AddConnectionAction(editor, connection) {
    var _this;

    _classCallCheck(this, AddConnectionAction);

    _this = _super.call(this);
    _this.helper = new ConnectionActionHelper(editor, connection);
    return _this;
  }

  _createClass(AddConnectionAction, [{
    key: "undo",
    value: function undo() {
      this.helper.remove();
    }
  }, {
    key: "redo",
    value: function redo() {
      this.helper.add();
    }
  }]);

  return AddConnectionAction;
}(Action);
var RemoveConnectionAction = /*#__PURE__*/function (_Action2) {
  _inherits(RemoveConnectionAction, _Action2);

  var _super2 = _createSuper(RemoveConnectionAction);

  function RemoveConnectionAction(editor, connection) {
    var _this2;

    _classCallCheck(this, RemoveConnectionAction);

    _this2 = _super2.call(this);
    _this2.helper = new ConnectionActionHelper(editor, connection);
    return _this2;
  }

  _createClass(RemoveConnectionAction, [{
    key: "undo",
    value: function undo() {
      this.helper.add();
    }
  }, {
    key: "redo",
    value: function redo() {
      this.helper.remove();
    }
  }]);

  return RemoveConnectionAction;
}(Action);

var NodeAction = /*#__PURE__*/function (_Action) {
  _inherits(NodeAction, _Action);

  var _super = _createSuper(NodeAction);

  function NodeAction(editor, node) {
    var _this;

    _classCallCheck(this, NodeAction);

    _this = _super.call(this);
    _this.editor = editor;
    _this.node = node;
    return _this;
  }

  return NodeAction;
}(Action);

var AddNodeAction = /*#__PURE__*/function (_NodeAction) {
  _inherits(AddNodeAction, _NodeAction);

  var _super2 = _createSuper(AddNodeAction);

  function AddNodeAction() {
    _classCallCheck(this, AddNodeAction);

    return _super2.apply(this, arguments);
  }

  _createClass(AddNodeAction, [{
    key: "undo",
    value: function undo() {
      this.editor.removeNode(this.node);
    }
  }, {
    key: "redo",
    value: function redo() {
      this.editor.addNode(this.node);
    }
  }]);

  return AddNodeAction;
}(NodeAction);
var RemoveNodeAction = /*#__PURE__*/function (_NodeAction2) {
  _inherits(RemoveNodeAction, _NodeAction2);

  var _super3 = _createSuper(RemoveNodeAction);

  function RemoveNodeAction() {
    _classCallCheck(this, RemoveNodeAction);

    return _super3.apply(this, arguments);
  }

  _createClass(RemoveNodeAction, [{
    key: "undo",
    value: function undo() {
      this.editor.addNode(this.node);
    }
  }, {
    key: "redo",
    value: function redo() {
      this.editor.removeNode(this.node);
    }
  }]);

  return RemoveNodeAction;
}(NodeAction);
var DragNodeAction = /*#__PURE__*/function (_NodeAction3) {
  _inherits(DragNodeAction, _NodeAction3);

  var _super4 = _createSuper(DragNodeAction);

  function DragNodeAction(editor, node, prev) {
    var _this2;

    _classCallCheck(this, DragNodeAction);

    _this2 = _super4.call(this, editor, node);
    _this2.prev = _toConsumableArray(prev);
    _this2["new"] = _toConsumableArray(node.position);
    return _this2;
  }

  _createClass(DragNodeAction, [{
    key: "_translate",
    value: function _translate(position) {
      var _this$editor$view$nod;

      (_this$editor$view$nod = this.editor.view.nodes.get(this.node)).translate.apply(_this$editor$view$nod, _toConsumableArray(position));
    }
  }, {
    key: "undo",
    value: function undo() {
      this._translate(this.prev);
    }
  }, {
    key: "redo",
    value: function redo() {
      this._translate(this["new"]);
    }
  }, {
    key: "update",
    value: function update(node) {
      this["new"] = _toConsumableArray(node.position);
    }
  }]);

  return DragNodeAction;
}(NodeAction);

var History = /*#__PURE__*/function () {
  function History() {
    _classCallCheck(this, History);

    this.active = false;
    this.produced = [];
    this.reserved = [];
  }

  _createClass(History, [{
    key: "add",
    value: function add(action) {
      if (this.active) return;
      this.produced.push(action);
      this.reserved = [];
    }
  }, {
    key: "last",
    get: function get() {
      return this.produced[this.produced.length - 1];
    }
  }, {
    key: "_do",
    value: function _do(from, to, type) {
      var action = from.pop();
      if (!action) return;
      this.active = true;
      action[type]();
      to.push(action);
      this.active = false;
    }
  }, {
    key: "undo",
    value: function undo() {
      this._do(this.produced, this.reserved, 'undo');
    }
  }, {
    key: "clear",
    value: function clear() {
      this.active = false;
      this.produced = [];
      this.reserved = [];
    }
  }, {
    key: "redo",
    value: function redo() {
      this._do(this.reserved, this.produced, 'redo');
    }
  }]);

  return History;
}();

function trackNodes(editor, history) {
  editor.on('nodecreated', function (node) {
    return history.add(new AddNodeAction(editor, node));
  });
  editor.on('noderemoved', function (node) {
    return history.add(new RemoveNodeAction(editor, node));
  });
  editor.on('nodetranslated', function (_ref) {
    var node = _ref.node,
        prev = _ref.prev;
    if (history.last instanceof DragNodeAction && history.last.node === node) history.last.update(node);else history.add(new DragNodeAction(editor, node, prev));
  });
}

function trackConnections(editor, history) {
  editor.on('connectioncreated', function (c) {
    return history.add(new AddConnectionAction(editor, c));
  });
  editor.on('connectionremoved', function (c) {
    return history.add(new RemoveConnectionAction(editor, c));
  });
} // eslint-disable-next-line max-statements


function install(editor, _ref2) {
  var _ref2$keyboard = _ref2.keyboard,
      keyboard = _ref2$keyboard === void 0 ? true : _ref2$keyboard;
  editor.bind('undo');
  editor.bind('redo');
  editor.bind('addhistory');
  var history = new History();
  editor.on('undo', function () {
    return history.undo();
  });
  editor.on('redo', function () {
    return history.redo();
  });
  editor.on('addhistory', function (action) {
    return history.add(action);
  });
  editor.on('clear', function () {
    history.clear();
  });
  if (keyboard) document.addEventListener('keydown', function (e) {
    if (!e.ctrlKey) return;

    switch (e.code) {
      case 'KeyZ':
        editor.trigger('undo');
        break;

      case 'KeyY':
        editor.trigger('redo');
        break;

      default:
    }
  });
  trackNodes(editor, history);
  trackConnections(editor, history);
}

var Action$1 = Action;
var index = {
  name: 'history',
  install: install
};

exports.Action = Action$1;
exports.default = index;
//# sourceMappingURL=history-plugin.common.js.map
