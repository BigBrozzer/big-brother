!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports["big-brother"]=t():e["big-brother"]=t()}(window,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=17)}([function(e,t){e.exports=require("react")},function(e,t,n){var r,o,i={},a=(r=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===o&&(o=r.apply(this,arguments)),o}),s=function(e){var t={};return function(e){if("function"==typeof e)return e();if(void 0===t[e]){var n=function(e){return document.querySelector(e)}.call(this,e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}}(),c=null,u=0,l=[],f=n(10);function d(e,t){for(var n=0;n<e.length;n++){var r=e[n],o=i[r.id];if(o){o.refs++;for(var a=0;a<o.parts.length;a++)o.parts[a](r.parts[a]);for(;a<r.parts.length;a++)o.parts.push(g(r.parts[a],t))}else{var s=[];for(a=0;a<r.parts.length;a++)s.push(g(r.parts[a],t));i[r.id]={id:r.id,refs:1,parts:s}}}}function p(e,t){for(var n=[],r={},o=0;o<e.length;o++){var i=e[o],a=t.base?i[0]+t.base:i[0],s={css:i[1],media:i[2],sourceMap:i[3]};r[a]?r[a].parts.push(s):n.push(r[a]={id:a,parts:[s]})}return n}function h(e,t){var n=s(e.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=l[l.length-1];if("top"===e.insertAt)r?r.nextSibling?n.insertBefore(t,r.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),l.push(t);else if("bottom"===e.insertAt)n.appendChild(t);else{if("object"!=typeof e.insertAt||!e.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var o=s(e.insertInto+" "+e.insertAt.before);n.insertBefore(t,o)}}function b(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var t=l.indexOf(e);t>=0&&l.splice(t,1)}function v(e){var t=document.createElement("style");return e.attrs.type="text/css",y(t,e.attrs),h(e,t),t}function y(e,t){Object.keys(t).forEach(function(n){e.setAttribute(n,t[n])})}function g(e,t){var n,r,o,i;if(t.transform&&e.css){if(!(i=t.transform(e.css)))return function(){};e.css=i}if(t.singleton){var a=u++;n=c||(c=v(t)),r=w.bind(null,n,a,!1),o=w.bind(null,n,a,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(e){var t=document.createElement("link");return e.attrs.type="text/css",e.attrs.rel="stylesheet",y(t,e.attrs),h(e,t),t}(t),r=function(e,t,n){var r=n.css,o=n.sourceMap,i=void 0===t.convertToAbsoluteUrls&&o;(t.convertToAbsoluteUrls||i)&&(r=f(r));o&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var a=new Blob([r],{type:"text/css"}),s=e.href;e.href=URL.createObjectURL(a),s&&URL.revokeObjectURL(s)}.bind(null,n,t),o=function(){b(n),n.href&&URL.revokeObjectURL(n.href)}):(n=v(t),r=function(e,t){var n=t.css,r=t.media;r&&e.setAttribute("media",r);if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}.bind(null,n),o=function(){b(n)});return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else o()}}e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(t=t||{}).attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||"boolean"==typeof t.singleton||(t.singleton=a()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var n=p(e,t);return d(n,t),function(e){for(var r=[],o=0;o<n.length;o++){var a=n[o];(s=i[a.id]).refs--,r.push(s)}e&&d(p(e,t),t);for(o=0;o<r.length;o++){var s;if(0===(s=r[o]).refs){for(var c=0;c<s.parts.length;c++)s.parts[c]();delete i[s.id]}}}};var m,R=(m=[],function(e,t){return m[e]=t,m.filter(Boolean).join("\n")});function w(e,t,n,r){var o=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=R(t,o);else{var i=document.createTextNode(o),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(i,a[t]):e.appendChild(i)}}},function(e,t){e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var n=function(e,t){var n=e[1]||"",r=e[3];if(!r)return n;if(t&&"function"==typeof btoa){var o=(a=r,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */"),i=r.sources.map(function(e){return"/*# sourceURL="+r.sourceRoot+e+" */"});return[n].concat(i).concat([o]).join("\n")}var a;return[n].join("\n")}(t,e);return t[2]?"@media "+t[2]+"{"+n+"}":n}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},o=0;o<this.length;o++){var i=this[o][0];"number"==typeof i&&(r[i]=!0)}for(o=0;o<e.length;o++){var a=e[o];"number"==typeof a[0]&&r[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),t.push(a))}},t}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.startPlaying=t.resetRecorder=t.sendRecords=t.stopRecording=t.startRecording=void 0;var r,o=n(0);(r=o)&&r.__esModule;var i=!1,a={initialState:null,actions:[]},s={},c={getRecord:console.log,sendRecord:console.log},u=(console.log,null),l=(t.startRecording=function(){s.initialState=u.getState(),i=!0},t.stopRecording=function(){i=!1},t.sendRecords=function(){return c.sendRecord(s)},t.resetRecorder=function(){Object.assign(s,a)}),f=(t.startPlaying=function(e){return c.getRecord(e).then(function(e){var t=e.initialState,n=e.actions;console.log("Received data",t,n),u.dispatch({type:"JOURNEY_REPRODUCING",initialState:t}),n.forEach(function(e,t){setTimeout(function(){return u.dispatch(e)},1e3*t)})})},function(e){return u=e,function(e){return function(t){i&&s.actions.push(t),e(t)}}});l(),t.default=function(e,t){return Object.assign(c,t),e,f}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e){var t="https://api.mlab.com/api/1/databases/"+e.dbName+"/collections/"+e.collName,n="apiKey="+e.apiKey;return{getRecord:function(e){return fetch(t+"/"+e+"?"+n).then(function(e){return e.json()}).catch(function(e){return console.warn("Failed getRecord",e)})},sendRecord:function(e){return fetch(t+"?"+n,function(e){return{body:JSON.stringify(e),method:"POST",headers:new Headers({"Content-Type":"application/json"})}}(e)).then(function(e){return e.json()}).then(function(e){return e._id.$oid}).catch(function(e){return console.warn("Failed sendRecord",e)})}}}},function(e,t,n){(e.exports=n(2)(!1)).push([e.i,".controls {\n  box-sizing: border-box;\n  height: 32px;\n  width: 100%;\n  padding-top: 3px;\n  background-color: #F2F2F2;\n\n  padding-left: 16px\n}\n\n.controls__frame {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  box-sizing: border-box;\n\n  border: 2px solid #D0021B;\n\n  pointer-events: none;\n}\n",""])},function(e,t,n){var r=n(5);"string"==typeof r&&(r=[[e.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n(1)(r,o);r.locals&&(e.exports=r.locals)},function(e,t,n){(e.exports=n(2)(!1)).push([e.i,".recorder-btn {\n  margin: 0;\n  padding: 0;\n  background-color: transparent;\n\n  font-size: 24px;\n  line-height: 1;\n  vertical-align: bottom;\n  border: none\n}\n\n.recorder-btn_record {\n  color: #D0021B\n}\n\n.record-title {\n  display: inline-block;\n  padding-left: 15px;\n  font-size: 12px;\n\n  color: #545454 ;\n}",""])},function(e,t,n){var r=n(7);"string"==typeof r&&(r=[[e.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n(1)(r,o);r.locals&&(e.exports=r.locals)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Recorder=void 0;var r,o=n(0),i=(r=o)&&r.__esModule?r:{default:r};n(8);var a=t.Recorder=function(e){var t=e.stopRecording,n=e.startRecording,r=e.recording,o=e.recordId;return o?i.default.createElement("span",null,o):r?i.default.createElement("button",{className:"recorder-btn",onClick:t}," ■"):i.default.createElement("span",null,i.default.createElement("button",{className:"recorder-btn recorder-btn_record",onClick:n},"●"),i.default.createElement("span",{className:"record-title"},"NEW_RECORD_1"))};t.default=a},function(e,t){e.exports=function(e){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var n=t.protocol+"//"+t.host,r=n+t.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(e,t){var o,i=t.trim().replace(/^"(.*)"$/,function(e,t){return t}).replace(/^'(.*)'$/,function(e,t){return t});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(i)?e:(o=0===i.indexOf("//")?i:0===i.indexOf("/")?n+i:r+i.replace(/^\.\//,""),"url("+JSON.stringify(o)+")")})}},function(e,t,n){(e.exports=n(2)(!1)).push([e.i,".player {\n  display: inline-block;\n  padding-left: 10px;\n}",""])},function(e,t,n){var r=n(11);"string"==typeof r&&(r=[[e.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n(1)(r,o);r.locals&&(e.exports=r.locals)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Player=void 0;var r,o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(0),a=(r=i)&&r.__esModule?r:{default:r};n(12);var s=t.Player=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.submit=n.submit.bind(n),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,i.Component),o(t,[{key:"submit",value:function(){this.props.startPlaying(this.idInput.value)}},{key:"render",value:function(){var e=this;return a.default.createElement("form",{className:"player",onSubmit:this.submit},a.default.createElement("input",{type:"text",ref:function(t){e.idInput=t}}),a.default.createElement("button",{type:"submit"},"Fetch"))}}]),t}();t.default=s},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.JourneyControls=void 0;var r=n(0),o=s(r),i=s(n(13)),a=s(n(9));function s(e){return e&&e.__esModule?e:{default:e}}var c=t.JourneyControls=function(e){return e.playing?o.default.createElement("span",null,"Reproduced"):o.default.createElement("div",null,o.default.createElement(a.default,e),!e.recording&&o.default.createElement(i.default,e))};c.propTypes={handleHide:r.PropTypes.func.isRequired},t.default=c},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(0),a=u(i),s=n(3),c=u(n(14));function u(e){return e&&e.__esModule?e:{default:e}}n(6);var l=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={isShowed:!1,recording:!1,playing:!1,sending:!1,recordId:""},n.startRecording=n.startRecording.bind(n),n.stopRecording=n.stopRecording.bind(n),n.startPlaying=n.startPlaying.bind(n),n.show=n.show.bind(n),n.hide=n.hide.bind(n),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,i.Component),o(t,[{key:"startRecording",value:function(){(0,s.startRecording)(),this.setState({recording:!0})}},{key:"stopRecording",value:function(){var e=this;(0,s.stopRecording)(),this.setState({recording:!1,sending:!0}),(0,s.sendRecords)().then(function(t){console.log("recordId",t),e.setState({recordId:t,sending:!1})})}},{key:"startPlaying",value:function(e){var t=this;this.setState({sending:!0}),(0,s.startPlaying)(e).then(function(){return t.setState({playing:!0,sending:!1})})}},{key:"show",value:function(){this.setState({isShowed:!0})}},{key:"hide",value:function(){this.setState({isShowed:!1})}},{key:"render",value:function(){return a.default.createElement("div",{className:this.state.recording?"controls controls_recording":"controls"},this.state.sending?a.default.createElement("span",null,"Spinner"):a.default.createElement(c.default,r({},this.state,{startRecording:this.startRecording,stopRecording:this.stopRecording,startPlaying:this.startPlaying,handleHide:this.hide})),this.state.recording&&a.default.createElement("div",{className:"controls__frame"}))}}]),t}();t.default=l},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(15);Object.defineProperty(t,"BBUI",{enumerable:!0,get:function(){return a(r).default}});var o=n(4);Object.defineProperty(t,"bbMLabProvider",{enumerable:!0,get:function(){return a(o).default}});var i=n(3);function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"bbMiddleware",{enumerable:!0,get:function(){return a(i).default}})},function(e,t,n){e.exports=n(16)}])});
//# sourceMappingURL=big-brother.js.map