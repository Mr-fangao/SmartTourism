import _global from '@/Global'

/**
 * 
 * @param {*} obj 
 */
function LocationShape(obj) {
    var iframe = $(".map iframe");
    if (obj === undefined) {
        return
    }
    var url =
        _global.weburl_DataCenter +
        "/Q.ashx?DBTag=" +
        _global.Appid +
        "&xKey=" +
        obj.xkey +
        "&key=" +
        obj.key;
    webAPI.server
        .get({
            url: url
        })
        .then(res => {
            if (res.data.length === 0) {
                return
            }
            if (res.data.length === 1) {
                res.data[0].nomarker = true;
            }
            console.log(res, "定位点");
            iframe[0].contentWindow.GeoneMap.clientShowPatrolPoints(
                res,
                true
            );

        });
}

function getQueryString(name, url) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = url ? url.substr(url.indexOf('?') + 1).match(reg) : window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

function getUrlKey(name, url) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url) || [, ""])[1].replace(/\+/g, '%20')) || null

}

//转换坐标
//CGS84ToGCJ_02
//POINT (121.15585 31.59998)
function ConvertCoors(wkt, type, callback) {
    var url = "http://58.210.9.131:90/CoorTrans2000/CoordConvertWkt.ashx?type=" + type + "&wkt=" + wkt
    webAPI.server
        .get({
            url: url
        })
        .then(res => {
            if (res.length == 0) return;
            callback(res);
        });
}

/**
 * 取出小括号内的内容
 * @param text
 * @returns {string}
 */
function getParenthesesStr(text) {
    let result = ''
    let regex = /\((.+?)\)/g;
    let options = text.match(regex)
    let option = options[0]
    result = option.substring(1, option.length - 1)
    return result
}


export default {
    LocationShape,
    getQueryString,
    ConvertCoors,
    getParenthesesStr
}