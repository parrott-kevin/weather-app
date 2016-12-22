webpackJsonp([0],{

/***/ 209:
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ },

/***/ 521:
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(92);

var _react = __webpack_require__(57);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(93);

__webpack_require__(94);

__webpack_require__(209);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WeatherDisplay = function WeatherDisplay(_ref) {
  var name = _ref.name,
      weather = _ref.weather;

  console.log(weather);
  return _react2.default.createElement(
    'div',
    { className: 'card' },
    _react2.default.createElement(
      'header',
      { className: 'card-header' },
      _react2.default.createElement(
        'p',
        { className: 'card-header-title' },
        name
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'card-content' },
      _react2.default.createElement(
        'div',
        { className: 'content' },
        _react2.default.createElement(
          'p',
          null,
          weather.weather
        ),
        _react2.default.createElement(
          'p',
          null,
          'Actual ',
          weather.temperature_string
        ),
        _react2.default.createElement(
          'p',
          null,
          'Feels Like ',
          weather.feelslike_string
        )
      )
    )
  );
};

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      options: [],
      value: '',
      weather: null
    };
    return _this;
  }

  _createClass(App, [{
    key: 'checkSelection',
    value: function checkSelection(input) {
      for (var i = this.state.options.length - 1; i >= 0; i--) {
        var option = this.state.options[i];
        if (option.label === input) {
          return {
            latitude: option.latitude,
            longitude: option.longitude
          };
        }
      }
      return false;
    }
  }, {
    key: 'getWeather',
    value: function getWeather() {
      var _this2 = this;

      var url = 'http://localhost:8080/api/v1/wu/conditions?latitude=' + this.state.latitude + '&longitude=' + this.state.longitude;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (json) {
        _this2.setState({ weather: json.current_observation });
      });
    }
  }, {
    key: 'getLocations',
    value: function getLocations(event) {
      var _this3 = this;

      var input = event.target.value;
      this.setState({ value: input });
      if (!input || input.length < 3) {
        this.setState({ options: [] });
      } else {
        var selection = this.checkSelection(input);
        if (selection) {
          this.setState({
            latitude: selection.latitude,
            longitude: selection.longitude
          });
        } else {
          var url = 'api/v1/wu/autocomplete/' + input;
          return fetch(url).then(function (response) {
            return response.json();
          }).then(function (json) {
            var options = json.RESULTS.map(function (item, index) {
              return {
                label: item.name,
                latitude: item.lat,
                longitude: item.lon
              };
            });
            if (options.length > 10) {
              _this3.setState({ options: options.slice(0, 9) });
            } else {
              _this3.setState({ options: options });
            }
          });
        }
      }
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      this.getWeather();
      event.preventDefault();
    }
  }, {
    key: 'render',
    value: function render() {
      var options = this.state.options.map(function (item) {
        return _react2.default.createElement('option', { value: item.label, key: item.label });
      });
      return _react2.default.createElement(
        'div',
        { className: 'container' },
        _react2.default.createElement(
          'div',
          { className: 'columns' },
          _react2.default.createElement(
            'div',
            { className: 'column' },
            _react2.default.createElement(
              'form',
              { onSubmit: this.handleSubmit.bind(this) },
              _react2.default.createElement(
                'p',
                { className: 'control has-addons' },
                _react2.default.createElement('input', {
                  id: 'locationInput',
                  type: 'text',
                  className: 'input is-expanded',
                  list: 'locations',
                  placeholder: 'Enter a location',
                  value: this.state.value,
                  'data-latitude': this.state.latitude,
                  'data-longitude': this.state.longitude,
                  onChange: this.getLocations.bind(this) }),
                _react2.default.createElement(
                  'datalist',
                  { id: 'locations' },
                  options
                ),
                _react2.default.createElement('input', { type: 'submit', value: 'Search', className: 'button is-primary' })
              )
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'columns' },
          _react2.default.createElement(
            'div',
            { className: 'column' },
            this.state.weather && _react2.default.createElement(WeatherDisplay, { name: this.state.value, weather: this.state.weather })
          )
        )
      );
    }
  }]);

  return App;
}(_react2.default.Component);

(0, _reactDom.render)(_react2.default.createElement(App, null), document.getElementById('app'));

/***/ }

},[521]);