<script>
const weburl_update =
  "http://58.210.9.131:90/DataCenterGXQ/Q.ashx?DBTag=XC_ZHDJ&xKey=GET_GXSJ";
const weburl_Onemap = "http://58.210.9.131:90/ZHXZ_FQ/";
// const weburl_Onemap = "http://localhost:8005/gxq_zhfq/";
const weburl_Onemap_GXQ = "http://49.234.224.181/ZHXZ_GXQ/";
const weburl_DataCenter = "http://58.210.9.131:90/DataCenterGXQ";
const weburl_dsjMapbox = "http://58.210.9.131:92/ZHXZ_FQ/dsjMapbox";
const Appid = "ZHXZ_FQ";
const web_title = "枫桥街道审批服务综合执法一体化平台";
const webUrl_TianQi =
  "https://www.tianqiapi.com/api/?version=v6&appid=33119664&appsecret=w47XHJpd&cityid=";
const weburl_GdXQ =
  "http://58.210.9.131:90/ZHXZ_FQ/ND/Common/PageDataView.aspx?ObjectID=859202161&NDFormType=1&FatherID=40100105&ChildID=40100105&ID=";
const weburl_HGXQ =
  "http://58.210.9.131:90/ZHXZ_FQ/ND/Common/PageDataView.aspx?ObjectID=1025438727&NDFormType=1&FatherID=20192100&ChildID=20192100&ID=";
const weburl_GdList =
  "http://58.210.9.131:90/ZHXZ_FQ/ND/Common/Grid.aspx?pMenuForMType=1&pObjID=859202161&pFolderTypeID=40100115&pFolderID=40100115&ptabtypeid=40100115";
const weburl_ZXESList =
  "http://58.210.9.131:90/ZHXZ_FQ/ND/Common/Grid.aspx?pMenuFormType=1&pObjID=827202047&pFolderTypeID=40100117&pFolderID=40100117&ptabtypeid=40100117";
const weburl_ZSEXList =
  "http://58.210.9.131:90/ZHXZ_FQ/ND/Common/Grid.aspx?pMenuFormType=1&pObjID=795201933&pFolderTypeID=40100116&pFolderID=40100116&ptabtypeid=40100116";
const weburl_WGYList =
  "http://58.210.9.131:90/ZHXZ_FQ/ND/Common/Grid.aspx?pMenuForMType=1&pObjID=609437245&pFolderTypeID=20200111&pFolderID=20200111&ptabtypeid=20200111";

const weburl_ZDXMForm =
  "http://58.210.9.131:90/ZHXZ_FQ/NDdsj/Common/PageDataView.aspx?ObjectID=833438043&NDFormType=1&FatherID=20209100&ChildID=20209100&ptaptypeid=20209100&ID=";

const weburl_xzspFM = "http://112.4.85.57:8081/stage-api";

// 综合执法平台
const weburl_ZHZF_Login = "http://36.154.62.115:2088/HomeIndex/PageIndex";
//综合执法地图部分
const weburl_ZHZF_Map =
  "http://3.15.21.3:8082/login_login.html?loginFrom=zhzf&code=320505004";

//指挥调度
const weburl_zhdd_kda = "http://3.15.21.3:8082/login_login.html?code=320505004";

// 双随机平台
const weburl_ZHZF_SSJ = "http://36.154.62.115:2088/Screen/search?area=fq";
const weburl_sqwg = "http://112.4.85.53:8000/wgWeb/#/bigdata";
const weburl_smwg = "http://112.4.85.53:8000/bigdata/#/bigdatashangmao";
const weburl_qywg = "http://112.4.85.53:8000/bigdata/#/bigdataQyindex";

//经济发展
const weburl_jjfzchange = "http://112.4.85.57:9000/customize/hqfq/simple";
const weburl_jjfznypt = "https://www.baidu.com/"; //能源智能运营平台

const weburl_fmtjfx =
  "http://112.4.85.57:704/FuminPolicy/HTML/Capital/peoplestatistics.html?nsukey=GZYbXbpRpvxXMKqCI%2BBcym5543u%2BoTacu61sPIv3hf1rPqUHT%2BkapAgpV0PLVlWo%2BYj5FL3sQsl6o1QIRWSPl3dJ8Qx75LEwsCGZNJd45xv9nyUFz30NyJGI6eL%2Bucz3%2BSE16WuokGRPKLkWYrggkRleuzYewnMA2n8n7dk5EnMZdVjBBRhk1fdetXZsEkszLnQLN8pgVNLpPn5cBpEePQ%3D%3D";
const weburl_znjg =
  "http://3.21.26.1:10000/yianju/screen/PC_fqSupervise";

const weburl_ZHZF_qlsjqdList =
  "http://49.234.224.181/ZHXZ_GXQ/NDDsj/Common/Grid.aspx?pMenuFormType=1&pObjID=626869350&pFolderTypeID=90100100&pFolderID=90100100&ptaptypeid=90100100&classno=";

const weburl_ZHZF_ZFAJ_ybaj =
  "http://49.234.224.181/ZHXZ_GXQ/NDDsj/Common/PageDataView.aspx?ObjectID=786869920&NDFormType=1&FatherID=90100200&ChildID=90100200&ptaptypeid=90100200&ID=";
const weburl_ZHZF_ZFAJ_jyaj =
  "http://49.234.224.181/ZHXZ_GXQ/NDDsj/Common/PageDataView.aspx?ObjectID=834870091&NDFormType=1&FatherID=90100300&ChildID=90100300&&ptaptypeid=90100300&ID=";
const weburl_ZHZF_ZFAJ_xcjw =
  "http://49.234.224.181/ZHXZ_GXQ/NDDsj/Common/PageDataView.aspx?ObjectID=882870262&NDFormType=1&FatherID=90100400&ChildID=90100400&ptaptypeid=90100400&ID=";
const weburl_ZHZF_ssjjgdList =
  "http://49.234.224.181/ZHXZ_GXQ/NDDsj/Common/Grid.aspx?pMenuFormType=1&pObjID=930870433&pFolderTypeID=90100500&pFolderID=90100500&ptaptypeid=90100500&area=枫桥&ID=";

const weburl_spfwSXQDList =
  "http://58.210.9.131:90/ZHXZ_FQ/NDdsj/Common/Grid.aspx?pMenuForMType=1&pObjID=612965310&pFolderTypeID=98989800&pFolderID=98989800&ptabtypeid=98989800&sjtype=";

export default {
  weburl_update,
  weburl_Onemap,
  weburl_Onemap_GXQ,
  weburl_DataCenter,
  Appid,
  weburl_dsjMapbox,
  web_title,
  webUrl_TianQi,
  weburl_GdXQ,
  weburl_HGXQ,
  weburl_GdList,
  weburl_ZXESList,
  weburl_ZSEXList,
  weburl_WGYList,
  weburl_xzspFM,
  weburl_sqwg,
  weburl_smwg,
  weburl_qywg,
  weburl_jjfzchange,
  weburl_fmtjfx,
  weburl_znjg,
  weburl_ZDXMForm,
  weburl_ZHZF_qlsjqdList,
  weburl_ZHZF_ZFAJ_ybaj,
  weburl_ZHZF_ZFAJ_jyaj,
  weburl_ZHZF_ZFAJ_xcjw,
  weburl_ZHZF_ssjjgdList,
  weburl_ZHZF_SSJ,
  weburl_ZHZF_Login,
  weburl_jjfznypt,
  weburl_spfwSXQDList,
  weburl_ZHZF_Map,
  weburl_zhdd_kda
};
</script>
