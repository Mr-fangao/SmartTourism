import {
  pubsub
} from "api/utils/pubsub";
import {
  server
} from "api/utils/server";
import {
  services
} from "./services";
window.geone = {
  _self: this,
  pubsub: pubsub,
  userInfo: null,
  modules: null,
  services: null,
  crossData: null,
  mapView: null,
  mapConfig: {
    userInfo: null,
    serviceList: null,
    tokensService: null,
    baseMap: null,
    baseMapLayers: null,
    mapMode: null,
    mapTools: null,
    quickSearch: null,
    layerTree: null,
    mapExtent: null,
    spatialReference: null,
  },
  menusConfig: [],
  setMenusConfig: function (menus) {
    menus.forEach(menu => {
      this.menusConfig.push(menu);
    });
  },
  templateConfig: [],
  getTemplateConfig: function (name) {
    for (var item of this.templateConfig) {
      if (item.name == name) {
        return comCopy(item)
      }
    }
    return comCopy(this.setTemplateConfig(name))
  },
  setTemplateConfig: function (name) {

    var model = null;
    let _this = this;
    server.ajax({
      url: services.GetEditTemplate + `&TemplateName=${name}`,
      async: false,
      callback(result) {
        if (result.status == 1) {
          model = result.data;
          model.name = name;
          _this.templateConfig.push(model);
        }
        // _this.templateConfig.push(model = Object.assign({ name: name }, result.data))
      }
    })
    return model;
  },
  data: null, // 全局临时共享data
  findDataByName: function (name) {
    if (this.data === null) {
      return null;
    }
    if (this.data.name === name) {
      return this.data;
    } else {
      this.data = null;
      return null;
    }
  },
  geometry: null, //存储全局临时的Geometry
  findGeometryByName: function (name) {
    if (this.geometry === null) {
      return null;
    }
    if (this.geometry.name === name) {
      return this.geometry;
    } else {
      this.geometry = null;
      return null;
    }
  },
  deepClone: function (initalObj, finalObj) {
    var obj = finalObj || {};
    for (var i in initalObj) {
      var prop = initalObj[i];
      if (prop === obj) {
        continue;
      }
      if (typeof prop === 'object') {
        obj[i] = (prop.constructor === Array) ? [] : Object.create(prop);
      } else {
        obj[i] = prop;
      }
    }
    return obj;
  },
  getServiceUrlByName: function (key) {
    var url = null;
    this.mapConfig.serviceList.forEach(function (item) {
      if (key.toLowerCase() === item.name.toLowerCase()) {
        url = item.url;
        return;
      }
    });
    // if (url.indexOf("@IP@") > -1) {
    //   console.log(url);
    //   url.replace("@IP@", window.top.webAPI.const.IP);
    // }
    return url;
  },
  guid: function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  },
  TKurl: function (url) {
    if (url.indexOf("http") > -1)
      return url
    var guid = this.guid();
    return `${window.location.origin+window.location.pathname}?guid=${guid}/#${url}`;

  },
  setCrossData(data) {
    this.crossData = data
  },
  getCrossData() {
    return comCopy(this.crossData)
  }
}



// WEBPACK FOOTER //
// ./src/core/config.js
