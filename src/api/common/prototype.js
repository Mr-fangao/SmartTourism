(
    function (w) {
        w.Array.prototype.remove = function (id) {
            if (this.length > 0) {
                this.splice(this.indexOf(id), 1);
            }
        };

        w.Array.prototype.removeMulti = function (key, value) {
            if (this.length > 0) {
                for (let j = 0; j < this.length; j++) {
                    if (value == this[j][key]) {
                        this.splice(j, 1);
                        j -= 1;
                        break;
                    }
                }
            }
        };

        w.Array.prototype.min = function () {
            if (this.length === 0) return null;
            if (this instanceof Array) {
                let min = this[0];
                this.forEach(d => {
                    if (d < min) {
                        min = d;
                    }
                });
                return min;
            } else {
                return null;
            }
        };

        w.Array.prototype.max = function () {
            if (this.length === 0) return null;
            if (this instanceof Array) {
                let max = this[0];
                this.forEach(d => {
                    if (d > max) {
                        max = d;
                    }
                });
                return max;
            } else {
                return null;
            }
        };

        w.Array.prototype.findByKey = function (key, keyName = "name") {
            if (this.length === 0) {
                return null;
            }
            return this.find(function (item) {
                return item[keyName] === key;
            });
        };

        w.Array.prototype.findByName = function (name) {
            if (this.length === 0) {
                return null;
            }
            return this.find(function (item) {
                return item.name === name;
            });
        };

        w.String.prototype.clear = function () {
            return this.replace(/[\r\n]/g, "");
        };

        w.Date.prototype.Format = function (fmt) {
            var o = {
                "M+": this.getMonth() + 1, //月份 
                "d+": this.getDate(), //日 
                "h+": this.getHours(), //小时 
                "m+": this.getMinutes(), //分 
                "s+": this.getSeconds(), //秒 
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
                "S": this.getMilliseconds() //毫秒 
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
            return fmt;
        };

        w.Array.prototype.deepCopy = function () {
            debugger;
            var _array = [];
            for (var i = 0; i < this.length; i++) {
                _array.push(this[i]);
            }
            return _array;
        };

        w.comCopy = function (obj) {
            return JSON.parse(JSON.stringify(obj))
        };

        w.getQueryString = function (name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
        };

        w.isEmptyObject = function (e) {
            var t;
            for (t in e) {
                return !1;
            }
            return !0;
        };

        w.bindEvent = function (node, type, func) {
            if (node.addEventListener) {
                node.addEventListener(type, func, false);
            } else if (node.attachEvent) {
                node.attachEvent("on" + type, func);
            } else {
                node["on" + type] = func;
            }
        };
    }
)(window);



  // WEBPACK FOOTER //
  // ./src/core/util/prototype.js