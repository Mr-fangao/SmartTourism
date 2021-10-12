class Cookie {
    constructor() {
 
    }
 
    setCookie(key, value, expireDate, path) {
      var cookieValue = encodeURIComponent(key) + "=";
      if (value) {
        cookieValue = cookieValue + encodeURIComponent(value);
      }
 
      if (expireDate) {
        cookieValue = cookieValue + "; expires=" + expireDate.toUTCString();
      }
 
      if (path) {
        cookieValue = cookieValue + "; path=" + path;
      }
 
      document.cookie = cookieValue;
    }
 
    getCookie(key) {
      var equalities = document.cookie.split("; ");
      for (var i = 0; i < equalities.length; i++) {
        if (!equalities[i]) {
          continue;
        }
 
        var splitted = equalities[i].split("=");
        if (splitted.length !== 2) {
          continue;
        }
 
        if (decodeURIComponent(splitted[0]) === key) {
          return decodeURIComponent(splitted[1] || "");
        }
      }
      return null;
    }
 
    deleteCookie(key, path) {
      var cookieValue = encodeURIComponent(key) + '=';
 
      cookieValue = cookieValue + "; expires=" + (new Date(new Date().getTime() - 86400000)).toUTCString();
      if (path) {
        cookieValue = cookieValue + "; path=" + path;
      }
      document.cookie = cookieValue;
    }
  }
 
  export const cookie = new Cookie()
 
 
 
 // WEBPACK FOOTER //
 // ./src/core/utils/cookie.js