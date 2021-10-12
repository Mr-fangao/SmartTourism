class Layer {
  constructor() {
    this.smallLayerId = null; //小弹窗框Id
    this.bigLayerId = null; //大弹出框Id
    this.maxLayerId = null; //最大弹出框Id
    this.leftLayerId = null;
  }

  //只能弹出一个窗体
  openSearchWin(title, url, area = ["320px", "250px"], offset = ["120px", "140px"]) {
    // this.isLayer();
    if (title.search("icon") === -1) {
      title = "<i class='ivu-icon ivu-icon-grid'/>" + title;
    }
    var _self = this;
    if (this.smallLayerId === null) {
      this.smallLayerId = layer.open({
        type: 2,
        title: title,
        offset: offset,
        maxmin: false,
        shadeClose: false,
        shade: 0,
        area: area,
        resize: false,
        content: url,
        end() {
          _self.smallLayerId = null;
        }
      });
    } else {
      layer.title(title, this.smallLayerId);
      layer.iframeSrc(this.smallLayerId, url);
      layer.style(this.smallLayerId, {
        width: area[0],
        height: area[1],
        top: offset[0],
        left: offset[1]
      });
    }
  }
  //只能弹出一个窗体
  openResultWin(title, url, area = ["1000px", "640px"]) {
    // this.isLayer();
    // if (title.search("icon") === -1) {
    //   title = "<i class='ivu-icon ivu-icon-monitor'/>" + title;
    // }
    if (this.bigLayerId === null) {
      this.openWin({
        title: title.length > 0 ? title : false,
        url: encodeURI(encodeURI(url)),
        area: area,
        fromRes: true
      });
    } else {
      layer.title(title, this.bigLayerId);
      layer.iframeSrc(this.bigLayerId, url);
      layer.style(this.bigLayerId, {
        width: area[0],
        height: area[1]
      });
    }
  }
  //弹出最大窗体
  openMaxWin(title, webUrl) {
    title = "<i class='el-icon-menu' style='margin-right:5px'/>" + title;
    if (this.maxLayerId === null) {
      var maxLayerId = layer.open({
        type: 2,
        title: title,
        shadeClose: false,
        shade: 0,
        move: false,
        offset: ['0', '0'],
        maxmin: false,
        resize: false,
        area: ['100%', '100%'],
        content: webUrl,
        end: function () {
          this.maxLayerId = null;
          // GeoneMap.clientClearGraphics();
        }
      })
    } else {
      layer.title(title, this.maxLayerId);
      layer.iframeSrc(this.maxLayerId, webUrl);
    }

  }
  //弹出左侧窗体
  openLeftWin = function (title, webUrl) {
    var _self = this;
    if (this.leftLayerId === null) {
      geone.pubsub.publish("setLeftMapBody", true);
      this.leftLayerId = layer.open({
        type: 2,
        move: false,
        title: title,
        offset: ['0', '0'],
        shadeClose: false,
        shade: 0,
        shift: -1,
        area: ['320px', '100%'],
        content: webUrl,
        end: function () {
          // if (!options.callback === false)
          //     options.callback();
          geone.pubsub.publish("setLeftMapBody", false);
          _self.leftLayerId = null;
        }
      });
    } else {
      layer.title(title, this.leftLayerId);
      layer.iframeSrc(this.leftLayerId, webUrl);
    }
  };
  //弹出更多窗口
  openMoreWindow(url, name) {
    this.openWin({
      title: name,
      maxmin: true,
      area: ["800px", "600px"],
      url: url
    })
  };
  //可以弹出多个窗体
  openWin(opt) {
    // this.isLayer();
    var _self = this;
    var id = layer.open({
      type: 2,
      title: opt.title || "",
      maxmin: opt.maxmin || opt.maxmin === true ? true : false,
      shadeClose: false,
      shade: opt.shade || 0,
      area: opt.area || ["800px", "600px"],
      content: opt.url,
      end() {
        if (opt.fromRes && opt.fromRes === true) {
          _self.bigLayerId = null;
        }
      }
    });
    if (opt.fromRes && opt.fromRes === true) {
      this.bigLayerId = id;
    }
    if (opt.full && opt.full === true) {
      layer.full(id)
    }
  }
  //预览一张图片
  openPhoto(opt) {
    this.isLayer();
    layer.photos({
      photos: {
        title: opt.title || "",
        id: 123,
        start: 0,
        data: [{
          alt: opt.alt || "",
          pid: 666,
          src: opt.src || ""
        }]
      },
      anim: 5
    });
  }
  //预览图片集
  openPhotos(opt) {
    this.isLayer();
    layer.photos({
      photos: {
        title: opt.title || "",
        id: 123,
        start: opt.start || 0,
        data: opt.data || []
      },
      anim: 5
    });
  }

  isLayer() {
    if (!layer) {
      console.log("请引用layer弹出层插件");
    }
  }
}

export const _layer = new Layer();



// WEBPACK FOOTER //
// ./src/core/utils/layer.js
