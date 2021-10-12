exports.install = function(Vue, options) {
    Vue.prototype.parseFloat = function(numStr) { //全局函数1
        return parseFloat(numStr);
    };

};