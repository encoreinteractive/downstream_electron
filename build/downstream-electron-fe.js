/*!
 * downstream-electron,0.1.0,2017-12-06 19:19:20.097,castlabs GmbH
 * 
 * Copyright (C) 2017 Castlabs GmbH.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t(require("fs"),require("path"));else if("function"==typeof define&&define.amd)define(["fs","path"],t);else{var s="object"==typeof exports?t(require("fs"),require("path")):t(e.fs,e.path);for(var r in s)("object"==typeof exports?exports:e)[r]=s[r]}}(this,function(e,t){return function(e){function t(r){if(s[r])return s[r].exports;var i=s[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var s={};return t.m=e,t.c=s,t.d=function(e,s,r){t.o(e,s)||Object.defineProperty(e,s,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var s=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(s,"a",s),s},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="build/",t(t.s=94)}({2:function(e,t){e.exports=require("fs")},3:function(e,t){e.exports=require("path")},4:function(e,t,s){(function(t){var r=s(2),i=s(3),n=i.join(t,"path.txt");if(!r.existsSync(n))throw new Error("Electron failed to install correctly, please delete node_modules/electron and try installing again");e.exports=i.join(t,r.readFileSync(n,"utf-8"))}).call(t,"/")},94:function(e,t,s){e.exports=s(95)},95:function(e,t,s){"use strict";function r(e){var t=e.manifestInfo.protections,s=t.video[0]||{};t.video&&(s=t.video.filter(function(t){return e.manifest.video.indexOf(t.id)>=0}),s=s[0]||{});for(var r=s.protections||[],i=void 0,n=0,o=r.length;n<o;n++)if(r[n].schemeIdUri===a){i=r[n].cencPSSH;break}return i}function i(e,t){return function(){t.apply(e,arguments)}}function n(e){for(var t=1,s=arguments.length;t<s;t++){var r=arguments[t];e[r]=i(e,e[r])}}function o(e,t){var s=d.getCurrentWindow();s&&(this._windowId=s.id),this._promisesObj={},this._subscribersId={},this._promiseCounter=0,this._window=e,this._persistent=t,n(this,"_processApi","_beforeUnload"),this._createApiMethods("downloads",["create","createPersistent","getList","getListWithInfo","getOfflineLink","info","remove","removeAll","removeAllUnfinished","removePersistent","resume","saveData","savePersistent","start","stop","stopAll","subscribe","unsubscribe"]),this._attachEvents()}var a="urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed",d=s(4).remote,c=s(4).ipcRenderer,u=void 0;o.prototype.downloads={},o.prototype.downloads.createPersistent=function(e,t,s){var i=e[0],n=e[1],o=this;this._persistent?this.downloads.info(i).then(function(e){e.persistent?s("persistent session already exists:"+JSON.stringify(e.persistent)):(n.pssh||(n.pssh=r(e)),o._persistent.createPersistentSession(n).then(function(e){o.downloads.savePersistent(i,e).then(t,s),t(e)},s))},s):s("No persistent plugin initialized")},o.prototype.downloads.removePersistent=function(e,t,s,r){this._persistent?r.persistent?this._persistent.removePersistentSession(r.persistent).then(t,s):s("persistent session doesn't exist:"):s("No persistent plugin initialized")},o.prototype.downloads.remove=function(e,t,s,r){var i=this;this._persistent&&r.persistent?i._persistent.removePersistentSession(r.persistent).then(t,s):t()},o.prototype.downloads.removeAll=function(e,t,s,r){var i=this;r=r||[];var n=r.filter(function(e){return!!e.persistent}),o=n.map(function(e){return e.persistent});if(this._persistent&&o.length>0){for(var a=[],d=0,c=o.length;d<c;d++)a.push(i._persistent.removePersistentSession(o[d]));Promise.all(a).then(t,s)}else t()},o.prototype._apiCall=function(e,t,s){var r=this,i=this._generatePromiseId(),n=new Promise(function(n,o){r._promisesObj[i]={resolve:n,reject:o,method:e,args:t,originalMethod:s}}),o={};return o.promiseId=i,o.method=e,o.windowId=this._windowId,o.args=t,this._send(o),n},o.prototype._attachEvents=function(){s(4).ipcRenderer.on("downstreamElectronFE",this._processApi),this._window.addEventListener("beforeunload",this._beforeUnload)},o.prototype._beforeUnload=function(){this._removeSubscribers()},o.prototype._createApiMethods=function(e,t){function s(e,t,s){return function(){return e._apiCall(t,arguments,s)}}this[e]=this[e]||{};for(var r=0,i=t.length;r<i;r++)!function(e,t,r){var i=void 0;"function"==typeof e[t][r]&&(i=e[t][r]),e[t][r]=s(e,t+"."+r,i)}(this,e,t[r])},o.prototype._executeSubscriber=function(e,t,s,r){var i=this._subscribersId[e];i&&i.callback(t,s),r&&i&&this._removeLocalSubscribers(i.manifestId)},o.prototype._generatePromiseId=function(){var e=(new Date).getTime();return this._promiseCounter++,this._promiseCounter+"-"+e},o.prototype._processApi=function(e,t){function s(e){o.resolve(e),this._removeLocalSubscribersForDefinedMethods(o.method,o.args[0]||e)}var r=t.promiseId,i=t.error,n=t.result,o=this._promisesObj[r+""];o?("OK"===t.status?"function"==typeof o.originalMethod?o.originalMethod.call(this,o.args,s.bind(this),o.reject.bind(this),n):s.call(this,n):o.reject(i),t.subscribersId&&this._saveSubscribersId(o,t.subscribersId),delete this._promisesObj[r]):t.subscriberId&&this._executeSubscriber(t.subscriberId,t.err,n,t.subscriberFinished)},o.prototype._removeSubscribers=function(){var e={},t=void 0;t=[];for(var s in this._subscribersId)this._subscribersId.hasOwnProperty(s)&&t.push(s);e.method="removeSubscribers",e.args=[t],this._send(e)},o.prototype._removeLocalSubscribers=function(e){var t=this;if("string"==typeof e?e=[e]:e instanceof Array&&(e=e.map(function(e){return"string"==typeof e?e:e.manifestInfo&&e.manifestInfo.id})),e)for(var s in this._subscribersId)this._subscribersId.hasOwnProperty(s)&&function(s){for(var r=0,i=e.length;r<i;r++)if("string"==typeof t._subscribersId[s].manifestId){if(t._subscribersId[s].manifestId===e[r]){delete t._subscribersId[s];break}}else{var n=t._subscribersId[s].manifestId.indexOf(e[r]);if(n>=0&&t._subscribersId[s].manifestId.splice(n,1),!t._subscribersId[s].manifestId.length){delete t._subscribersId[s];break}}}(s);else this._subscribersId={}},o.prototype._removeLocalSubscribersForDefinedMethods=function(e,t){var s=["downloads.stop","downloads.stopAll","downloads.remove","downloads.removeAll","downloads.removeAllUnfinished","downloads.unsubscribe"];"downloads.removeAll"!==e&&"downloads.stopAll"!==e||(t=void 0);for(var r=0,i=s.length;r<i;r++)if(e===s[r]){this._removeLocalSubscribers(t);break}},o.prototype._saveSubscribersId=function(e,t){var s=void 0,r=void 0;for("string"!=typeof t&&"number"!=typeof t||(t=[String(t)]),s=0,r=t.length;s<r;s++)this._subscribersId[t[s]]={manifestId:e.args[0],callback:e.args[2+s]}},o.prototype._send=function(e){try{c.send("downstreamElectronBE",e)}catch(e){console.error(e)}},e.exports={init:function(e,t){return u||(u=new o(e,t)),u}}}})});