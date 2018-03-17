!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports["big-brother"]=t():e["big-brother"]=t()}(window,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=8)}([function(e,t){e.exports=require("react")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.startPlaying=t.resetRecorder=t.sendRecords=t.stopRecording=t.startRecording=void 0;var r,o=n(0);(r=o)&&r.__esModule;var i=!1,u={initialState:null,actions:[]},a={},c={getRecord:console.log,sendRecord:console.log},l=(console.log,null),s=(t.startRecording=function(){i=!0},t.stopRecording=function(){i=!1},t.sendRecords=function(){return c.sendRecord(a)},t.resetRecorder=function(){Object.assign(a,u)}),f=(t.startPlaying=function(e){return c.getRecord(e).then(function(e){var t=e.initialState,n=e.actions;console.log("Received data",t,n),l.dispatch({type:"JOURNEY_REPRODUCING",initialState:t}),n.forEach(function(e,t){setTimeout(function(){return l.dispatch(e)},1e3*t)})})},function(e){return l=e,function(t){return function(n){console.log("Middleware triggered:",n),i&&(null===a.initialState&&(a.initialState=e.getState(),console.log("Store defined:",n)),a.actions.push(n)),t(n)}}});s(),t.default=function(e,t){return Object.assign(c,t),e,f}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e){var t="https://api.mlab.com/api/1/databases/"+e.dbName+"/collections/"+e.collName,n="apiKey="+e.apiKey;return{getRecord:function(e){return fetch(t+"/"+e+"?"+n).then(function(e){return e.json()}).catch(function(e){return console.warn("Failed getRecord",e)})},sendRecord:function(e){return fetch(t+"?"+n,function(e){return{body:JSON.stringify(e),method:"POST",headers:new Headers({"Content-Type":"application/json"})}}(e)).then(function(e){return e.json()}).then(function(e){return e._id.$oid}).catch(function(e){return console.warn("Failed sendRecord",e)})}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Recorder=void 0;var r,o=n(0),i=(r=o)&&r.__esModule?r:{default:r};var u=t.Recorder=function(e){var t=e.stopRecording,n=e.startRecording,r=e.recording,o=e.recordId;return o?i.default.createElement("span",null,o):r?i.default.createElement("button",{onClick:t},"Stop"):i.default.createElement("button",{onClick:n},"Start")};t.default=u},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Player=void 0;var r,o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(0),u=(r=i)&&r.__esModule?r:{default:r};var a=t.Player=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.submit=n.submit.bind(n),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,i.Component),o(t,[{key:"submit",value:function(){this.props.startPlaying(this.idInput.value)}},{key:"render",value:function(){var e=this;return u.default.createElement("form",{onSubmit:this.submit},u.default.createElement("input",{type:"text",ref:function(t){e.idInput=t}}),u.default.createElement("button",{type:"submit"},"Fetch"))}}]),t}();t.default=a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.JourneyControls=void 0;var r=u(n(0)),o=u(n(4)),i=u(n(3));function u(e){return e&&e.__esModule?e:{default:e}}var a=t.JourneyControls=function(e){return e.playing?r.default.createElement("span",null,"Reproduced"):r.default.createElement("div",null,!e.recording&&r.default.createElement(o.default,e),r.default.createElement(i.default,e))};t.default=a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(0),u=l(i),a=n(1),c=l(n(5));function l(e){return e&&e.__esModule?e:{default:e}}var s=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={recording:!1,playing:!1,sending:!1,recordId:""},n.startRecording=n.startRecording.bind(n),n.stopRecording=n.stopRecording.bind(n),n.startPlaying=n.startPlaying.bind(n),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,i.Component),o(t,[{key:"startRecording",value:function(){(0,a.startRecording)(),this.setState({recording:!0})}},{key:"stopRecording",value:function(){var e=this;(0,a.stopRecording)(),this.setState({recording:!1,sending:!0}),(0,a.sendRecords)().then(function(t){console.log("recordId",t),e.setState({recordId:t,sending:!1})})}},{key:"startPlaying",value:function(e){var t=this;this.setState({sending:!0}),(0,a.startPlaying)(e).then(function(){return t.setState({playing:!0,sending:!1})})}},{key:"render",value:function(){return u.default.createElement("div",{style:{position:"fixed",top:"10px",right:"10px"}},this.state.sending?u.default.createElement("span",null,"Spinner"):u.default.createElement(c.default,r({},this.state,{startRecording:this.startRecording,stopRecording:this.stopRecording,startPlaying:this.startPlaying})))}}]),t}();t.default=s},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(6);Object.defineProperty(t,"BBUI",{enumerable:!0,get:function(){return u(r).default}});var o=n(2);Object.defineProperty(t,"bbMLabProvider",{enumerable:!0,get:function(){return u(o).default}});var i=n(1);function u(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"bbMiddleware",{enumerable:!0,get:function(){return u(i).default}})},function(e,t,n){e.exports=n(7)}])});