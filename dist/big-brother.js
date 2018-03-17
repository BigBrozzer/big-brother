/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/api-providers/mlabProvider.js":
/*!*******************************************!*\
  !*** ./src/api-providers/mlabProvider.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nvar getPostConfig = function getPostConfig(data) {\n    return {\n        body: JSON.stringify(data),\n        method: 'POST',\n        headers: new Headers({ 'Content-Type': 'application/json' })\n    };\n};\n\nvar getMLabConfig = function getMLabConfig(_ref) {\n    var dbName = _ref.dbName,\n        collName = _ref.collName,\n        apiKey = _ref.apiKey;\n\n    var mlabApi = 'https://api.mlab.com/api/1/databases/' + dbName + '/collections/' + collName;\n    var queryParams = 'apiKey=' + apiKey;\n\n    return {\n        getRecord: function getRecord(id) {\n            return fetch(mlabApi + '/' + id + '?' + queryParams).then(function (response) {\n                return response.json();\n            }).catch(function (e) {\n                return console.warn('Failed getRecord', e);\n            });\n        },\n        sendRecord: function sendRecord(data) {\n            return fetch(mlabApi + '?' + queryParams, getPostConfig(data)).then(function (response) {\n                return response.json();\n            }).then(function (data) {\n                return data['_id']['$oid'];\n            }).catch(function (e) {\n                return console.warn('Failed sendRecord', e);\n            });\n        }\n\n    };\n};\n\nexports.default = getMLabConfig;\n\n//# sourceURL=webpack:///./src/api-providers/mlabProvider.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _Journey = __webpack_require__(/*! ./react-ui/Journey */ \"./src/react-ui/Journey.js\");\n\nObject.defineProperty(exports, 'BBUI', {\n  enumerable: true,\n  get: function get() {\n    return _interopRequireDefault(_Journey).default;\n  }\n});\n\nvar _mlabProvider = __webpack_require__(/*! ./api-providers/mlabProvider */ \"./src/api-providers/mlabProvider.js\");\n\nObject.defineProperty(exports, 'bbMLabProvider', {\n  enumerable: true,\n  get: function get() {\n    return _interopRequireDefault(_mlabProvider).default;\n  }\n});\n\nvar _journeyConnector = __webpack_require__(/*! ./middleware/journeyConnector */ \"./src/middleware/journeyConnector.js\");\n\nObject.defineProperty(exports, 'bbMiddleware', {\n  enumerable: true,\n  get: function get() {\n    return _interopRequireDefault(_journeyConnector).default;\n  }\n});\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/middleware/journeyConnector.js":
/*!********************************************!*\
  !*** ./src/middleware/journeyConnector.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.startPlaying = exports.resetRecorder = exports.sendRecords = exports.stopRecording = exports.startRecording = undefined;\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar recording = false;\n\nvar initialJourneyInfo = {\n    initialState: null,\n    actions: []\n};\nvar journeyInfo = {};\nvar api = {\n    getRecord: console.log,\n    sendRecord: console.log\n};\nvar reducer = console.log;\nvar appStore = null;\n\nvar startRecording = exports.startRecording = function startRecording() {\n    recording = true;\n};\n\nvar stopRecording = exports.stopRecording = function stopRecording() {\n    recording = false;\n};\n\nvar sendRecords = exports.sendRecords = function sendRecords() {\n    return api.sendRecord(journeyInfo);\n};\n\nvar resetRecorder = exports.resetRecorder = function resetRecorder() {\n    Object.assign(journeyInfo, initialJourneyInfo);\n};\n\nvar startPlaying = exports.startPlaying = function startPlaying(id) {\n    return api.getRecord(id).then(function (_ref) {\n        var initialState = _ref.initialState,\n            actions = _ref.actions;\n\n        console.log('Received data', initialState, actions);\n\n        appStore.dispatch({\n            type: 'JOURNEY_REPRODUCING',\n            initialState: initialState\n        });\n\n        actions.forEach(function (action, index) {\n            setTimeout(function () {\n                return appStore.dispatch(action);\n            }, index * 1000);\n        });\n    });\n};\n\nvar journeyMiddleWare = function journeyMiddleWare(store) {\n    appStore = store;\n\n    return function (next) {\n        return function (action) {\n            console.log('Middleware triggered:', action);\n            if (recording) {\n                if (journeyInfo.initialState === null) {\n                    journeyInfo.initialState = store.getState();\n                    console.log('Store defined:', action);\n                }\n                journeyInfo.actions.push(action);\n            }\n            next(action);\n        };\n    };\n};\n\nvar journeyConnector = function journeyConnector(rootReducer, apiProvider) {\n    Object.assign(api, apiProvider);\n    reducer = rootReducer;\n\n    return journeyMiddleWare;\n};\n\nresetRecorder();\n\nexports.default = journeyConnector;\n\n//# sourceURL=webpack:///./src/middleware/journeyConnector.js?");

/***/ }),

/***/ "./src/react-ui/Journey.js":
/*!*********************************!*\
  !*** ./src/react-ui/Journey.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _journeyConnector = __webpack_require__(/*! ../middleware/journeyConnector */ \"./src/middleware/journeyConnector.js\");\n\nvar _JourneyControls = __webpack_require__(/*! ./JourneyControls */ \"./src/react-ui/JourneyControls.js\");\n\nvar _JourneyControls2 = _interopRequireDefault(_JourneyControls);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Journey = function (_Component) {\n    _inherits(Journey, _Component);\n\n    function Journey(props) {\n        _classCallCheck(this, Journey);\n\n        var _this = _possibleConstructorReturn(this, (Journey.__proto__ || Object.getPrototypeOf(Journey)).call(this, props));\n\n        _this.state = {\n            recording: false,\n            playing: false,\n            sending: false,\n            recordId: ''\n        };\n\n        _this.startRecording = _this.startRecording.bind(_this);\n        _this.stopRecording = _this.stopRecording.bind(_this);\n        _this.startPlaying = _this.startPlaying.bind(_this);\n        return _this;\n    }\n\n    _createClass(Journey, [{\n        key: 'startRecording',\n        value: function startRecording() {\n            (0, _journeyConnector.startRecording)();\n            this.setState({ recording: true });\n        }\n    }, {\n        key: 'stopRecording',\n        value: function stopRecording() {\n            var _this2 = this;\n\n            (0, _journeyConnector.stopRecording)();\n            this.setState({ recording: false, sending: true });\n\n            (0, _journeyConnector.sendRecords)().then(function (recordId) {\n                console.log('recordId', recordId);\n                _this2.setState({ recordId: recordId, sending: false });\n            });\n        }\n    }, {\n        key: 'startPlaying',\n        value: function startPlaying(id) {\n            var _this3 = this;\n\n            this.setState({ sending: true });\n\n            (0, _journeyConnector.startPlaying)(id).then(function () {\n                return _this3.setState({ playing: true, sending: false });\n            });\n        }\n    }, {\n        key: 'render',\n        value: function render() {\n            return _react2.default.createElement(\n                'div',\n                { style: { position: 'fixed', top: '10px', right: '10px' } },\n                this.state.sending ? _react2.default.createElement(\n                    'span',\n                    null,\n                    'Spinner'\n                ) : _react2.default.createElement(_JourneyControls2.default, _extends({}, this.state, {\n                    startRecording: this.startRecording,\n                    stopRecording: this.stopRecording,\n                    startPlaying: this.startPlaying\n                }))\n            );\n        }\n    }]);\n\n    return Journey;\n}(_react.Component);\n\nexports.default = Journey;\n\n//# sourceURL=webpack:///./src/react-ui/Journey.js?");

/***/ }),

/***/ "./src/react-ui/JourneyControls.js":
/*!*****************************************!*\
  !*** ./src/react-ui/JourneyControls.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.JourneyControls = undefined;\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _Player = __webpack_require__(/*! ./Player */ \"./src/react-ui/Player.js\");\n\nvar _Player2 = _interopRequireDefault(_Player);\n\nvar _Recorder = __webpack_require__(/*! ./Recorder */ \"./src/react-ui/Recorder.js\");\n\nvar _Recorder2 = _interopRequireDefault(_Recorder);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar JourneyControls = exports.JourneyControls = function JourneyControls(props) {\n    return props.playing ? _react2.default.createElement(\n        'span',\n        null,\n        'Reproduced'\n    ) : _react2.default.createElement(\n        'div',\n        null,\n        !props.recording && _react2.default.createElement(_Player2.default, props),\n        _react2.default.createElement(_Recorder2.default, props)\n    );\n};\n\nexports.default = JourneyControls;\n\n//# sourceURL=webpack:///./src/react-ui/JourneyControls.js?");

/***/ }),

/***/ "./src/react-ui/Player.js":
/*!********************************!*\
  !*** ./src/react-ui/Player.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.Player = undefined;\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Player = exports.Player = function (_Component) {\n    _inherits(Player, _Component);\n\n    function Player(props) {\n        _classCallCheck(this, Player);\n\n        var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, props));\n\n        _this.submit = _this.submit.bind(_this);\n        return _this;\n    }\n\n    _createClass(Player, [{\n        key: \"submit\",\n        value: function submit() {\n            this.props.startPlaying(this.idInput.value);\n        }\n    }, {\n        key: \"render\",\n        value: function render() {\n            var _this2 = this;\n\n            return _react2.default.createElement(\n                \"form\",\n                { onSubmit: this.submit },\n                _react2.default.createElement(\"input\", {\n                    type: \"text\",\n                    ref: function ref(input) {\n                        _this2.idInput = input;\n                    }\n                }),\n                _react2.default.createElement(\n                    \"button\",\n                    { type: \"submit\" },\n                    \"Fetch\"\n                )\n            );\n        }\n    }]);\n\n    return Player;\n}(_react.Component);\n\nexports.default = Player;\n\n//# sourceURL=webpack:///./src/react-ui/Player.js?");

/***/ }),

/***/ "./src/react-ui/Recorder.js":
/*!**********************************!*\
  !*** ./src/react-ui/Recorder.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n     value: true\n});\nexports.Recorder = undefined;\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar Recorder = exports.Recorder = function Recorder(_ref) {\n     var stopRecording = _ref.stopRecording,\n         startRecording = _ref.startRecording,\n         recording = _ref.recording,\n         recordId = _ref.recordId;\n     return recordId ? _react2.default.createElement(\n          'span',\n          null,\n          recordId\n     ) : recording ? _react2.default.createElement(\n          'button',\n          { onClick: stopRecording },\n          'Stop'\n     ) : _react2.default.createElement(\n          'button',\n          { onClick: startRecording },\n          'Start'\n     );\n};\n\nexports.default = Recorder;\n\n//# sourceURL=webpack:///./src/react-ui/Recorder.js?");

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/index.js */\"./src/index.js\");\n\n\n//# sourceURL=webpack:///multi_./src/index.js?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");\n\n//# sourceURL=webpack:///external_%22react%22?");

/***/ })

/******/ });