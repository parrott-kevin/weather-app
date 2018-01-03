webpackJsonp([0],{

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export SERVER_ERROR */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return REQUEST_WEATHER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return RECEIVE_WEATHER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return REQUEST_LOCATIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return RECEIVE_LOCATIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return QUERY_LOCATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CLEAR_QUERY; });
/* harmony export (immutable) */ __webpack_exports__["h"] = gather;
/* unused harmony export request */
/* unused harmony export receive */
/* unused harmony export serverError */
/* harmony export (immutable) */ __webpack_exports__["i"] = queryLocation;
/* harmony export (immutable) */ __webpack_exports__["g"] = clearQuery;
var SERVER_ERROR = 'SERVER_ERROR';
var REQUEST_WEATHER = 'REQUEST_WEATHER';
var RECEIVE_WEATHER = 'RECEIVE_WEATHER';
var REQUEST_LOCATIONS = 'REQUEST_LOCATIONS';
var RECEIVE_LOCATIONS = 'RECEIVE_LOCATIONS';
var QUERY_LOCATION = 'QUERY_LOCATION';
var CLEAR_QUERY = 'CLEAR_QUERY';

function gather(actions, apiPromise) {
  actions.error = SERVER_ERROR;
  return function (dispatch) {
    dispatch(request(actions.request));
    return apiPromise.then(function (json) {
      return dispatch(receive(actions.receive, json));
    }).catch(function (err) {
      dispatch(serverError(err));
    });
  };
}

function request(type) {
  return {
    type: type
  };
}

function receive(type, response) {
  return {
    type: type,
    response: response,
    receivedAt: new Date().toJSON().toString()
  };
}

function serverError(_ref) {
  var ok = _ref.ok,
      status = _ref.status,
      message = _ref.message;

  return {
    type: SERVER_ERROR,
    ok: ok,
    status: status,
    message: message
  };
}

function queryLocation(query) {
  return {
    type: QUERY_LOCATION,
    query: query
  };
}

function clearQuery() {
  return {
    type: CLEAR_QUERY
  };
}

/***/ }),

/***/ 160:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_polyfill__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_polyfill___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_polyfill__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_whatwg_fetch__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_whatwg_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_whatwg_fetch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_dom__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_bulma_css_bulma_css__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_bulma_css_bulma_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_bulma_css_bulma_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__containers_Root_jsx__ = __webpack_require__(373);










Object(__WEBPACK_IMPORTED_MODULE_3_react_dom__["render"])(__WEBPACK_IMPORTED_MODULE_2_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__containers_Root_jsx__["a" /* default */], null), document.getElementById('app'));

/***/ }),

/***/ 372:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 373:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__configureStore__ = __webpack_require__(402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__App_jsx__ = __webpack_require__(404);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var store = Object(__WEBPACK_IMPORTED_MODULE_2__configureStore__["a" /* default */])();

var Root = function (_React$Component) {
  _inherits(Root, _React$Component);

  function Root() {
    _classCallCheck(this, Root);

    return _possibleConstructorReturn(this, (Root.__proto__ || Object.getPrototypeOf(Root)).apply(this, arguments));
  }

  _createClass(Root, [{
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_1_react_redux__["Provider"],
        { store: store },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__App_jsx__["a" /* default */], null)
      );
    }
  }]);

  return Root;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (Root);

/***/ }),

/***/ 402:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = configureStore;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_thunk__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_thunk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux_thunk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_logger__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_logger___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_redux_logger__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__reducers__ = __webpack_require__(403);





var loggerMiddleware = Object(__WEBPACK_IMPORTED_MODULE_2_redux_logger__["createLogger"])();

function configureStore(preloadedState) {
  return Object(__WEBPACK_IMPORTED_MODULE_0_redux__["createStore"])(__WEBPACK_IMPORTED_MODULE_3__reducers__["a" /* default */], preloadedState, Object(__WEBPACK_IMPORTED_MODULE_0_redux__["applyMiddleware"])(__WEBPACK_IMPORTED_MODULE_1_redux_thunk___default.a, loggerMiddleware));
}

/***/ }),

/***/ 403:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actions__ = __webpack_require__(158);




function queriedLocation() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var action = arguments[1];

  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_1__actions__["b" /* QUERY_LOCATION */]:
      return action.query;
    case __WEBPACK_IMPORTED_MODULE_1__actions__["a" /* CLEAR_QUERY */]:
      return '';
    default:
      return state;
  }
}

function weather() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { isFetching: false, currentObservation: {} };
  var action = arguments[1];

  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_1__actions__["f" /* REQUEST_WEATHER */]:
      return Object.assign({}, state, {
        isFetching: true
      });
    case __WEBPACK_IMPORTED_MODULE_1__actions__["d" /* RECEIVE_WEATHER */]:
      return Object.assign({}, state, {
        isFetching: false,
        currentObservation: action.response.current_observation,
        receivedAt: action.receivedAt
      });
    case __WEBPACK_IMPORTED_MODULE_1__actions__["a" /* CLEAR_QUERY */]:
      return {
        isFetching: false,
        currentObservation: {}
      };
    default:
      return state;
  }
}

function locations() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { isFetching: false, list: [] };
  var action = arguments[1];

  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_1__actions__["e" /* REQUEST_LOCATIONS */]:
      return Object.assign({}, state, {
        isFetching: true
      });
    case __WEBPACK_IMPORTED_MODULE_1__actions__["c" /* RECEIVE_LOCATIONS */]:
      return Object.assign({}, state, {
        isFetching: false,
        list: action.response.RESULTS,
        receivedAt: action.receivedAt
      });
    case __WEBPACK_IMPORTED_MODULE_1__actions__["a" /* CLEAR_QUERY */]:
      return {
        isFetching: false,
        list: []
      };
    default:
      return state;
  }
}

var rootReducer = Object(__WEBPACK_IMPORTED_MODULE_0_redux__["combineReducers"])({
  weather: weather,
  locations: locations,
  queriedLocation: queriedLocation
});

/* harmony default export */ __webpack_exports__["a"] = (rootReducer);

/***/ }),

/***/ 404:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_select__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_select_dist_react_select_css__ = __webpack_require__(407);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_select_dist_react_select_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_select_dist_react_select_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_WeatherDisplay_tsx__ = __webpack_require__(408);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_WeatherDisplay_tsx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__components_WeatherDisplay_tsx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__actions__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__api__ = __webpack_require__(409);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }












var wu = new __WEBPACK_IMPORTED_MODULE_7__api__["a" /* default */]();

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.handleInputChange = _this.handleInputChange.bind(_this);
    _this.handleChange = _this.handleChange.bind(_this);
    return _this;
  }

  _createClass(App, [{
    key: 'handleInputChange',
    value: function handleInputChange(input) {
      var dispatch = this.props.dispatch;

      if (input) {
        var actions = {
          request: __WEBPACK_IMPORTED_MODULE_6__actions__["e" /* REQUEST_LOCATIONS */],
          receive: __WEBPACK_IMPORTED_MODULE_6__actions__["c" /* RECEIVE_LOCATIONS */]
        };
        dispatch(Object(__WEBPACK_IMPORTED_MODULE_6__actions__["h" /* gather */])(actions, wu.getLocations(input)));
      }
    }
  }, {
    key: 'handleChange',
    value: function handleChange(selectedOption) {
      var _props = this.props,
          dispatch = _props.dispatch,
          locations = _props.locations;


      if (selectedOption) {
        dispatch(Object(__WEBPACK_IMPORTED_MODULE_6__actions__["i" /* queryLocation */])(selectedOption.value));

        var location = locations.list.find(function (item) {
          return item.name === selectedOption.value;
        });
        var actions = {
          request: __WEBPACK_IMPORTED_MODULE_6__actions__["f" /* REQUEST_WEATHER */],
          receive: __WEBPACK_IMPORTED_MODULE_6__actions__["d" /* RECEIVE_WEATHER */]
        };
        dispatch(Object(__WEBPACK_IMPORTED_MODULE_6__actions__["h" /* gather */])(actions, wu.getWeather(location.lat, location.lon)));
      } else {
        dispatch(Object(__WEBPACK_IMPORTED_MODULE_6__actions__["g" /* clearQuery */])());
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          query = _props2.query,
          locations = _props2.locations,
          weather = _props2.weather;


      var selectedOptions = locations.list.map(function (item) {
        return {
          value: item.name,
          label: item.name
        };
      });
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'container' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'columns' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'column' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_select__["default"], {
              name: 'form-field-name',
              value: query,
              onChange: this.handleChange,
              onInputChange: this.handleInputChange,
              options: selectedOptions,
              isLoading: locations.isFetching
            })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'columns' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'column' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__components_WeatherDisplay_tsx__["WeatherDisplay"], { name: query, weather: weather })
          )
        )
      );
    }
  }]);

  return App;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

App.propTypes = {
  dispatch: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  query: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  locations: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,
  weather: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object
};

function mapStateToProps(state) {
  var locations = state.locations,
      query = state.queriedLocation,
      weather = state.weather;

  return {
    query: query,
    locations: locations,
    weather: weather
  };
}

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_2_react_redux__["connect"])(mapStateToProps)(App));

/***/ }),

/***/ 407:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 408:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __webpack_require__(22);
exports.WeatherDisplay = function (props) {
    var name = props.name, weather = props.weather;
    if (Object.keys(weather.currentObservation).length > 0) {
        return (react_1.default.createElement("div", { className: 'card' },
            react_1.default.createElement("header", { className: 'card-header' },
                react_1.default.createElement("p", { className: 'card-header-title' }, name)),
            react_1.default.createElement("div", { className: 'card-content' },
                react_1.default.createElement("div", { className: 'content' },
                    react_1.default.createElement("p", null, weather.currentObservation.weather),
                    react_1.default.createElement("p", null,
                        "Actual ",
                        weather.currentObservation.temperature_string),
                    react_1.default.createElement("p", null,
                        "Feels Like ",
                        weather.currentObservation.feelslike_string)))));
    }
    else {
        return null;
    }
};
// WeatherDisplay.propTypes = {
//   name: PropTypes.string,
//   weather: PropTypes.object
// }


/***/ }),

/***/ 409:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WeatherUnderground = function () {
  function WeatherUnderground() {
    var version = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'v1';

    _classCallCheck(this, WeatherUnderground);

    this.baseUri = 'http://localhost:' + 8000 + '/api/' + version + '/wu';
  }

  _createClass(WeatherUnderground, [{
    key: 'checkResponseJSON',
    value: function checkResponseJSON(response) {
      if (!response.ok) {
        var err = new Error(response.statusText);
        err.ok = response.ok;
        err.status = response.status;
        throw err;
      } else {
        return response.text().then(function (text) {
          var result = text ? JSON.parse(text) : { results: [] };
          return result;
        });
      }
    }
  }, {
    key: '_fetch',
    value: function _fetch(uri) {
      var _this = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return new Promise(function (resolve, reject) {
        fetch(uri, options).then(_this.checkResponseJSON).then(function (json) {
          return resolve(json);
        }).catch(function (error) {
          reject(error);
        });
      });
    }
  }, {
    key: 'getWeather',
    value: function getWeather(latitude, longitude) {
      return this._fetch(this.baseUri + '/conditions?latitude=' + latitude + '&longitude=' + longitude);
    }
  }, {
    key: 'getLocations',
    value: function getLocations(query) {
      return this._fetch(this.baseUri + '/autocomplete/' + query);
    }
  }]);

  return WeatherUnderground;
}();

/* harmony default export */ __webpack_exports__["a"] = (WeatherUnderground);

/***/ })

},[160]);
//# sourceMappingURL=87a1a6acba808bb684cb.app.js.map