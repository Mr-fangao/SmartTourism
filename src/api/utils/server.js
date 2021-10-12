import Axios from "axios";
import QS from "qs";
import $ from "jquery";
class Server {
  get(opt) {
    return new Promise(function (resolve, reject) {
      if (opt.url.toLowerCase().indexOf("@ip") > -1) {
        opt.url = opt.url.toLowerCase().replace(/@ip/g, webAPI._const.IP);
      }
      Axios.defaults.timeout = 100000; //5s超时
      Axios.get(encodeURI(opt.url), {
          params: opt.params || {}
        })
        .then(function (rsp) {
          resolve(rsp.data);
        }).catch(err => {
          resolve({
            status: 0,
            message: err
          });
        });
    });
  }
  post(opt) {
    return new Promise(function (resolve, reject) {
      if (opt.url.toLowerCase().indexOf("@ip") > -1) {
        opt.url = opt.url.toLowerCase().replace(/@ip/g, webAPI.const.IP);
      }
      Axios.defaults.timeout = 10000; //5s超时
      Axios.post(encodeURI(opt.url), QS.stringify(opt.params || {}))
        .then(function (rsp) {
          resolve(rsp.data);
        }).catch(err => {
          resolve({
            status: 0,
            message: err
          });
        });
    });
  }
  post2(opt) {
    return new Promise(function (resolve, reject) {
      if (opt.url.toLowerCase().indexOf("@ip") > -1) {
        opt.url = opt.url.toLowerCase().replace(/@ip/g, webAPI.const.IP);
      }
      Axios.defaults.timeout = 50000; //5s超时
      Axios.post(encodeURI(opt.url), opt.params)
        .then(function (rsp) {
          resolve(rsp.data);
        }).catch(err => {
          resolve("");
        });
    });
  }
  postFile(opt) {
    return new Promise(function (resolve, reject) {
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      if (opt.url.toLowerCase().indexOf("@ip") > -1) {
        opt.url = opt.url.toLowerCase().replace(/@ip/g, webAPI.const.IP);
      }
      Axios.defaults.timeout = 20000; //5s超时
      Axios.post(encodeURI(opt.url), opt.formData, config)
        .then(function (rsp) {
          resolve(rsp.data);
        }).catch(err => {
          resolve({
            status: 0,
            message: err
          });
        });
    });
  }
  ajax(opt) {
    $.ajax({
      url: opt.url,
      data: opt.data,
      dataType: "json",
      async: opt.async === false ? false : true,
      success: function (result) {
        opt.callback(result);
      }
    })
  }
}
export const server = new Server();


// WEBPACK FOOTER //
// ./src/core/server.js
