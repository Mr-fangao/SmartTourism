class Loader {
    constructor() {}
    createScript(url) {
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      return script;
    }
  
    createStylesheetLink(url) {
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      return link;
    }
  
    loadJS(url) {
      return new Promise(resolve => {
        var script = this.createScript(url);
        document.body.appendChild(script);
        script.onload = script.onreadystatechange = function () {
          if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
            resolve(true);
          }
          script.onload = script.onreadystatechange = null;
        }
      });
    }
  
    loadCSS(url) {
      var link = this.createStylesheetLink(url);
      document.body.appendChild(link);
    }
  }
  
  export const loader = new Loader();
  
  
  
  // WEBPACK FOOTER //
  // ./src/core/utils/loader.js