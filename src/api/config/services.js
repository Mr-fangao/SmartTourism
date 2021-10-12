import {
  constfig
} from "./const";

var IP = constfig.IP,
  AppId = constfig.AppId,
  DataCenter = constfig.DataCenter,
  ExportIP = constfig.ExportIP;

export const services = {
  exportUrl(type) {
    return `http://${ExportIP}/engine/export/${type}?appid=${AppId}`;
  },
  mapLogin: `http://${IP}/${DataCenter}/vue/LoginJs.ashx?xVer=js&appid=${AppId}&xUserName=admin&xPassword=`,
  login: `http://${IP}/${DataCenter}/vue/LoginJs.ashx?xVer=js&appid=${AppId}`,
  edit: `http://${IP}/${DataCenter}/Edit.ashx?DBTag=${AppId}&queryType=sql`,
  querySQL: `http://${IP}/${DataCenter}/querySQL.ashx?&DBTag=${AppId}&resultType=list&xVer=js`,
  GetEditTemplate: `http://${IP}/${DataCenter}/MapLayers.ashx?&appid=${AppId}&queryType=GetEditTemplate`,
  dataConvert: `http://58.210.9.131:90//DataConvertService/DataConvertHandler.ashx?ConvertType=towkt&sType=file&GeoFileType=`,
};
