import {
  server as _server
} from "./server"
import {
  screen
} from "./screen";
import {
  cookie
} from "./cookie";
import {
  base64
} from "./base64"
import {
  browser
} from "./browser"

//判断是否是空对象
function isEmptyObject(e) {
  var t;
  for (t in e) {
    return !1;
  }
  return !0;
}
//兼容多个浏览器的事件绑定
function bindEvent(node, type, func) {
  if (node.addEventListener) {
    node.addEventListener(type, func, false);
  } else if (node.attachEvent) {
    node.attachEvent("on" + type, func);
  } else {
    node["on" + type] = func;
  }
}
//通过字符串方式实现对象深拷贝
function deepCopy(obj) {
  if (typeof (obj) === "object") {
    return JSON.parse(JSON.stringify(obj));
  }
  return null;
}
//生成自定位数的随机数
function random(n = 10) {
  var rnd = "";
  for (var i = 0; i < n; i++)
    rnd += Math.floor(Math.random() * 10);
  return rnd;
}
//jquery查询url字符
function getQueryString(name, url) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = url
    ? url.substr(url.indexOf("?") + 1).match(reg)
    : window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

export const utils = {
  screen: screen,
  cookie: cookie,
  base64: base64,
  browser: browser,
  isEmptyObject: isEmptyObject,
  bindEvent: bindEvent,
  deepCopy: deepCopy,
  random: random,
  getQueryString: getQueryString
};
export const server = _server;



  // WEBPACK FOOTER //
  // ./src/core/utils/index.js