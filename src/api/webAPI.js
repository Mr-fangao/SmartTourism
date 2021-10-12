import {
  Constfig,
  // CONFIG,
  Services
} from "api/config"
import {
  pubsub
} from "./utils/pubsub";
import {
  utils,
  server
} from "./utils";
import "./common/prototype";

var webAPI = webAPI || {};
(function () {
  webAPI.const = Constfig; //静态配置文件
  // webAPI.config = CONFIG; //主配置文件
  webAPI.services = Services; //服务配置文件
  webAPI.server = server;
//   webAPI.layer = _layer;
  webAPI.pubsub = pubsub; //观察者、订阅者
  webAPI.utils = utils; //utils相关方法
  webAPI.token = {};
  //获取url参数
  webAPI.url = {
    query(name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return unescape(r[2]);
      }
      return null;
    }
  };
})();
window.webAPI = webAPI;



// WEBPACK FOOTER //
// ./src/core/onemap.js
