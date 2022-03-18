"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () { })); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Clock = /*#__PURE__*/function (_React$Component) {
  _inherits(Clock, _React$Component);

  var _super = _createSuper(Clock);

  function Clock(props) {
    var _this;

    _classCallCheck(this, Clock);

    _this = _super.call(this, props);
    _this.state = {
      time: new Date()
    };
    return _this;
  }

  _createClass(Clock, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      setInterval(function () {
        return _this2.timerID = _this2.tick();
      }, 500);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearInterval(this.timerID);
      this.props.cancel();
    }
  }, {
    key: "tick",
    value: function tick() {
      this.setState({
        time: new Date()
      });
    }
  }, {
    key: "displayTime",
    value: function displayTime() {
      var nowTime = this.state.time;
      var year = nowTime.getFullYear();
      var month = ("0" + (nowTime.getMonth() + 1)).slice(-2);
      var date = ('0' + nowTime.getDate()).slice(-2);
      var hour = ('0' + nowTime.getHours()).slice(-2);
      var minute = ('0' + nowTime.getMinutes()).slice(-2);
      var second = ('0' + nowTime.getSeconds()).slice(-2);
      return "".concat(year, "/").concat(month, "/").concat(date, " ").concat(hour, ":").concat(minute, ":").concat(second);
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", null, this.displayTime());
    }
  }]);

  return Clock;
}(React.Component);

var Canvas = /*#__PURE__*/function (_React$Component2) {
  _inherits(Canvas, _React$Component2);

  var _super2 = _createSuper(Canvas);

  function Canvas(props) {
    var _this3;

    _classCallCheck(this, Canvas);

    _this3 = _super2.call(this, props);
    _this3.state = {
      Width: window.innerWidth - 20,
      Height: window.innerHeight - 120,
      left_position: 0,
      top_position: 0,
      left_increase: true,
      top_increase: true,
      dx: 2,
      dy: 2,
      interval: 10,
      btnNum: 0,
      value: 2,
      rotate: 0
    };
    _this3.handleChange = _this3.handleChange.bind(_assertThisInitialized(_this3));
    _this3.rotateChange = _this3.rotateChange.bind(_assertThisInitialized(_this3));
    return _this3;
  }

  _createClass(Canvas, [{
    key: "handleChange",
    value: function handleChange(event) {
      var speed = event.target.value;
      this.setState({
        value: speed,
        dx: Number(speed),
        dy: Number(speed)
      });
    }
  }, {
    key: "rotateChange",
    value: function rotateChange(event) {
      this.setState({
        rotate: event.target.value
      });
    }
  }, {
    key: "btnColors",
    value: function btnColors() {
      var colors = ['primary', 'info', 'success', 'warning', 'danger'];
      var num = this.state.btnNum % 5;
      var btnColor = colors[num];
      return 'btn btn-' + btnColor;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this4 = this;

      setInterval(function () {
        return _this4.MoveID = _this4.move();
      }, this.state.interval);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearInterval(this.MoveID);
    }
  }, {
    key: "move",
    value: function move() {
      var x = this.state.left_position;
      var y = this.state.top_position;
      var x_add = this.state.left_increase;
      var y_add = this.state.top_increase;
      var dx = this.state.dx;
      var dy = this.state.dy;

      if (x_add) {
        this.setState({
          left_position: x + dx
        });

        if (x >= this.state.Width - 100 - dx * 2) {
          this.setState({
            left_increase: false,
            btnNum: this.state.btnNum + 1
          });
        }
      } else {
        this.setState({
          left_position: x - dx
        });

        if (x <= dx) {
          this.setState({
            left_increase: true,
            btnNum: this.state.btnNum + 1
          });
        }
      }

      if (y_add) {
        this.setState({
          top_position: y + dy
        });

        if (y >= this.state.Height - 100 - dy * 2) {
          this.setState({
            top_increase: false,
            btnNum: this.state.btnNum + 1
          });
        }
      } else {
        this.setState({
          top_position: y - dy
        });

        if (y <= dy) {
          this.setState({
            top_increase: true,
            btnNum: this.state.btnNum + 1
          });
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          width: this.state.Width,
          height: this.state.Height,
          border: 'solid 1px #00bfff',
          margin: 10
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          position: 'relative',
          margin: 0,
          padding: 0,
          width: '100px',
          height: '100px',
          left: this.state.left_position + 'px',
          top: this.state.top_position + 'px',
          borderRadius: '50%'
        },
        className: this.btnColors()
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          position: 'relative',
          top: '25px',
          transform: "rotate(".concat(this.state.rotate, "deg)")
        }
      }, /*#__PURE__*/React.createElement(Clock, null)))), /*#__PURE__*/React.createElement("div", {
        style: {
          height: 80,
          width: this.state.Width,
          margin: '10px'
        }
      }, /*#__PURE__*/React.createElement("label", {
        htmlFor: "speedRange",
        className: "form-range"
      }, "\u901F\u5EA6 : ", this.state.value), /*#__PURE__*/React.createElement("input", {
        id: "speedRange",
        className: "form-range",
        type: "range",
        min: "0",
        max: "10",
        value: this.state.value,
        onChange: this.handleChange
      }), /*#__PURE__*/React.createElement("label", {
        htmlFor: "rotateRange",
        className: "form-range"
      }, "\u56DE\u8EE2 : ", this.state.rotate, " [deg]"), /*#__PURE__*/React.createElement("input", {
        id: "rotateRange",
        className: "form-range",
        type: "range",
        min: "0",
        max: "360",
        value: this.state.rotate,
        onChange: this.rotateChange
      })));
    }
  }]);

  return Canvas;
}(React.Component);

var App = function App() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(Canvas, null));
};

ReactDOM.render( /*#__PURE__*/React.createElement(App), document.getElementById('root'));