webpackJsonp([0],{

/***/ 148:
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QUERY_LOCATION = exports.RECEIVE_LOCATIONS = exports.REQUEST_LOCATIONS = exports.RECEIVE_WEATHER = exports.REQUEST_WEATHER = undefined;
exports.queryLocation = queryLocation;
exports.fetchWeatherIfNeeded = fetchWeatherIfNeeded;
exports.fetchLocationsIfNeeded = fetchLocationsIfNeeded;

__webpack_require__(76);

var REQUEST_WEATHER = exports.REQUEST_WEATHER = 'REQUEST_WEATHER';
var RECEIVE_WEATHER = exports.RECEIVE_WEATHER = 'RECEIVE_WEATHER';
var REQUEST_LOCATIONS = exports.REQUEST_LOCATIONS = 'REQUEST_LOCATIONS';
var RECEIVE_LOCATIONS = exports.RECEIVE_LOCATIONS = 'RECEIVE_LOCATIONS';
var QUERY_LOCATION = exports.QUERY_LOCATION = 'QUERY_LOCATION';

function queryLocation(query) {
  return {
    type: QUERY_LOCATION,
    query: query
  };
}

function requestWeather(location) {
  return {
    type: REQUEST_WEATHER,
    location: location
  };
}

function receiveWeather(location, json) {
  var results = {
    type: RECEIVE_WEATHER,
    location: location,
    weather: json.current_observation,
    receivedAt: Date.now()
  };
  console.log(results);
  return results;
}

function fetchWeather(state, location) {
  var _state$locationsByQue = state.locationsByQuery[location].items[0],
      latitude = _state$locationsByQue.latitude,
      longitude = _state$locationsByQue.longitude;

  return function (dispatch) {
    dispatch(requestWeather(location));
    var url = 'http://localhost:8080/api/v1/wu/conditions?latitude=' + latitude + '&longitude=' + longitude;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (json) {
      dispatch(receiveWeather(location, json));
    });
  };
}

function shouldFetchWeather(state, location) {
  if (location === '' || state.locationsByQuery[location].items.length === 1) {
    return true;
  } else {
    return false;
  }
}

function fetchWeatherIfNeeded(location) {
  return function (dispatch, getState) {
    if (shouldFetchWeather(getState(), location)) {
      return dispatch(fetchWeather(getState(), location));
    }
  };
}

function requestLocations(query) {
  return {
    type: REQUEST_LOCATIONS,
    query: query
  };
}

function receiveLocations(query, json) {
  var locations = json.RESULTS.map(function (item) {
    return {
      name: item.name,
      latitude: item.lat,
      longitude: item.lon
    };
  });
  var results = {
    type: RECEIVE_LOCATIONS,
    query: query,
    locations: locations.length > 10 ? locations.slice(0, 9) : locations,
    receivedAt: Date.now()
  };
  return results;
}

function fetchLocations(query) {
  return function (dispatch) {
    dispatch(requestLocations(query));
    var url = 'api/v1/wu/autocomplete/' + query;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (json) {
      return dispatch(receiveLocations(query, json));
    });
  };
}

function shouldFetchLocations(state, query) {
  if (query === '') {
    return false;
  }
  var locations = state.locationsByQuery[query];
  if (!locations) {
    return true;
  } else {
    return false;
  }
}

function fetchLocationsIfNeeded(query) {
  return function (dispatch, getState) {
    if (shouldFetchLocations(getState(), query)) {
      return dispatch(fetchLocations(query));
    }
  };
}

/***/ },

/***/ 213:
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(36);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(94);

var _configureStore = __webpack_require__(216);

var _configureStore2 = _interopRequireDefault(_configureStore);

var _App = __webpack_require__(217);

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var store = (0, _configureStore2.default)();

var Root = function (_React$Component) {
  _inherits(Root, _React$Component);

  function Root() {
    _classCallCheck(this, Root);

    return _possibleConstructorReturn(this, (Root.__proto__ || Object.getPrototypeOf(Root)).apply(this, arguments));
  }

  _createClass(Root, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        _react2.default.createElement(_App2.default, null)
      );
    }
  }]);

  return Root;
}(_react2.default.Component);

exports.default = Root;

/***/ },

/***/ 214:
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ },

/***/ 215:
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeatherDisplay = undefined;

var _react = __webpack_require__(36);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WeatherDisplay = exports.WeatherDisplay = function WeatherDisplay(_ref) {
  var name = _ref.name,
      weather = _ref.weather;

  return _react2.default.createElement(
    "div",
    { className: "card" },
    _react2.default.createElement(
      "header",
      { className: "card-header" },
      _react2.default.createElement(
        "p",
        { className: "card-header-title" },
        name
      )
    ),
    _react2.default.createElement(
      "div",
      { className: "card-content" },
      _react2.default.createElement(
        "div",
        { className: "content" },
        _react2.default.createElement(
          "p",
          null,
          weather.weather
        ),
        _react2.default.createElement(
          "p",
          null,
          "Actual ",
          weather.temperature_string
        ),
        _react2.default.createElement(
          "p",
          null,
          "Feels Like ",
          weather.feelslike_string
        )
      )
    )
  );
};

/***/ },

/***/ 216:
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = configureStore;

var _redux = __webpack_require__(75);

var _reduxThunk = __webpack_require__(147);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxLogger = __webpack_require__(146);

var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

var _reducers = __webpack_require__(218);

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loggerMiddleware = (0, _reduxLogger2.default)();

function configureStore(preloadedState) {
  return (0, _redux.createStore)(_reducers2.default, preloadedState, (0, _redux.applyMiddleware)(_reduxThunk2.default, loggerMiddleware));
}

/***/ },

/***/ 217:
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(36);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(94);

var _WeatherDisplay = __webpack_require__(215);

var _actions = __webpack_require__(148);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    return _this;
  }

  _createClass(App, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          dispatch = _props.dispatch,
          selectedLocation = _props.selectedLocation;

      dispatch((0, _actions.fetchLocationsIfNeeded)(selectedLocation));
    }
  }, {
    key: 'handleChange',
    value: function handleChange(event) {
      var input = event.target.value;
      this.props.dispatch((0, _actions.queryLocation)(input));
      this.props.dispatch((0, _actions.fetchLocationsIfNeeded)(input));
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      event.preventDefault();
      console.log(this.props);
      this.props.dispatch((0, _actions.fetchWeatherIfNeeded)(this.props.query));
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          query = _props2.query,
          locations = _props2.locations,
          weather = _props2.weather,
          isFetching = _props2.isFetching;

      var options = locations.map(function (item) {
        return _react2.default.createElement('option', { value: item.name, key: item.name });
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
              { onSubmit: this.handleSubmit, autoComplete: 'off' },
              _react2.default.createElement(
                'p',
                { className: 'control has-addons' },
                _react2.default.createElement('input', {
                  id: 'locationInput',
                  type: 'text',
                  className: 'input is-expanded',
                  list: 'locations',
                  placeholder: 'Enter a location',
                  value: query,
                  onChange: this.handleChange }),
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
            !isFetching && _react2.default.createElement(_WeatherDisplay.WeatherDisplay, { name: query, weather: weather })
          )
        )
      );
    }
  }]);

  return App;
}(_react2.default.Component);

function mapStateToProps(state) {
  var locationsByQuery = state.locationsByQuery,
      query = state.queriedLocation,
      weatherByLocation = state.weatherByLocation;

  var _ref = locationsByQuery[query] || { items: [] },
      locations = _ref.items;

  var _ref2 = weatherByLocation[query] || { isFetching: true, weather: {} },
      isFetching = _ref2.isFetching,
      weather = _ref2.weather;

  return {
    query: query,
    locations: locations,
    isFetching: isFetching,
    weather: weather
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(App);

/***/ },

/***/ 218:
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(75);

var _actions = __webpack_require__(148);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function queriedLocation() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var action = arguments[1];

  switch (action.type) {
    case _actions.QUERY_LOCATION:
      return action.query;
    default:
      return state;
  }
}

function weather() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { isFetching: false, weather: {} };
  var action = arguments[1];

  switch (action.type) {
    case _actions.REQUEST_WEATHER:
      return Object.assign({}, state, {
        isFetching: true
      });
    case _actions.RECEIVE_WEATHER:
      return Object.assign({}, state, {
        isFetching: false,
        weather: action.weather,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}

function weatherByLocation() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case _actions.RECEIVE_WEATHER:
    case _actions.REQUEST_WEATHER:
      return Object.assign({}, _defineProperty({}, action.location, weather(state[action.location], action)));
    default:
      return state;
  }
}

function locations() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { isFetching: false, items: [] };
  var action = arguments[1];

  switch (action.type) {
    case _actions.REQUEST_LOCATIONS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case _actions.RECEIVE_LOCATIONS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.locations,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}

function locationsByQuery() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case _actions.RECEIVE_LOCATIONS:
    case _actions.REQUEST_LOCATIONS:
      return Object.assign({}, state, _defineProperty({}, action.query, locations(state[action.query], action)));
    default:
      return state;
  }
}

var rootReducer = (0, _redux.combineReducers)({
  weatherByLocation: weatherByLocation,
  locationsByQuery: locationsByQuery,
  queriedLocation: queriedLocation
});

exports.default = rootReducer;

/***/ },

/***/ 527:
/***/ function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(95);

var _react = __webpack_require__(36);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(96);

__webpack_require__(76);

__webpack_require__(214);

var _Root = __webpack_require__(213);

var _Root2 = _interopRequireDefault(_Root);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _reactDom.render)(_react2.default.createElement(_Root2.default, null), document.getElementById('app'));

/***/ }

},[527]);