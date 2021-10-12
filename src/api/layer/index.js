import {
  loader
} from "api/utils/loader"
loader.loadCSS("static/js/layer/theme/default/layer.css");
loader.loadJS("static/js/jquery/jquery.min.js").then(e => {
  loader.loadJS("static/js/layer/layer.js");
});
import {
  _layer
} from "./layer";
window.layerAPI = _layer;

