import Highcharts from "highcharts/highstock";
import HighchartsMore from "highcharts/highcharts-more";
import HighchartsDrilldown from "highcharts/modules/drilldown";
import HighchartsVenn from "highcharts/modules/venn";  //恩图
import Highcharts3D from "highcharts/highcharts-3d";
import Highmaps from "highcharts/modules/map";

HighchartsMore(Highcharts);
HighchartsDrilldown(Highcharts);
HighchartsVenn(Highcharts);
Highcharts3D(Highcharts);
Highmaps(Highcharts);
var colorList = {
    theme1: ["#FF5950", "#007AFF", "#FFC40B", "#44A11D", "#04C7FF", "#6DB565", "#BA7E4E", "#D76B9B"]
}
var config = {
    pie: {
        credits: {
            enabled: false
        },
        chart: {
            type: "pie",
            backgroundColor: "rgba(0,0,0,0)",
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            text: ""
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: "pointer",
                depth: 45,
                dataLabels: {
                    enabled: true,
                    inside: true,
                    useHTML: true,
                    verticalAlign: 'middle',
                    distance: -10,//控制饼图外面的线的长短,为负数时文本内容在饼图内部
                    format: '<span style="font-size: 32px;">{point.name}</span><br/> <span style="font-size: 32px;">{point.y}({point.percentage:.1f}%)</span>',//'<b>{point.name}</b>({point.y}) {point.percentage:.1f} %',
                    style: {
                        fontSize: '32px', //这个是改饼状图里面显示的字体 
                        fontWeight: "bold",
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || '#FFFFFF'
                    }
                }
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size: 20px;color:{point.color};">{series.name}</span><br/>',
            pointFormat: ' <span style="font-size: 30px;color:{point.color};">{point.name}：<br/>{point.percentage:.1f}%</span><br/>',
            style: {
                fontSize: 24,
                fontWeight: "bold",
                color: (Highcharts.theme && Highcharts.theme.contrastTextColor)
            }
        },
        legend: {
            orient: "vertical",
            x: "75%",
            y: "center",
            data: [],
            style: {
                color: "#fff",
                fontSize: 24,
                fontWeight: "bold"
            }
        },
        colors: colorList.theme1,
        series: [{
            name: "",
            type: "pie",
            radius: "80%",
            center: ["50%", "40%"],
            avoidLabelOverlap: true,
            allowPointSelect: true,
            keys: ['name', 'y', 'selected', 'sliced'],
            label: {
                normal: {
                    show: false,
                    position: "center"
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: 40,
                        fontWeight: "bold"
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: []
        }]
    },
    column2: {
        credits: {
            enabled: false
        },
        chart: {
            type: "column",
            backgroundColor: "rgba(20,20,42,0)",
            options3d: {
                enabled: true,
                alpha: 15,
                beta: -30,
                viewDistance: 25,
                depth: 40,
                frame: {
                    bottom: {
                        size: 1,
                        color: "transparent"
                    },
                    side: {
                        size: 10,
                        color: "transparent"
                    },
                    back: {
                        size: 1,
                        color: "transparent"
                    }
                }
            },
            marginTop: 10,
            marginRight: 10
        },
        title: {
            text: ""
        },
        xAxis: {
            categories: [],
            gridLineColor: "#738298",
            gridLineWidth: 0,
            labels: {
                enabled: false
            } //去掉刻度数字
        },
        legend: {
            enabled: false
        },
        yAxis: {
            gridLineColor: "#197F07",
            gridLineWidth: 0,
            labels: {
                enabled: false
            }, //去掉刻度数字
            allowDecimals: false,
            min: 0,
            title: {
                text: ""
            }
        },
        colors: colorList.theme1,
        plotOptions: {
            column: {
                stacking: "normal",
                depth: 80,
                pointWidth: 120,
                dataLabels: {
                    distance: 300,
                    enabled: true,
                    color: "#FFF",
                    format: "{y}",
                    style: {
                        fontSize: "26px"
                    }
                }
            }
        },
        series: []
    },
    packedbubble: {
        credits: {
            enabled: false
        },
        chart: {
            type: 'packedbubble',
            backgroundColor: "rgba(0,0,0,0)",
            // height: '100%'
        },
        title: {
            text: ''
        },
        colors: colorList.theme1,
        tooltip: {
            useHTML: true,
            pointFormat: '<b>{point.name}:</b> {point.y}'
        },
        plotOptions: {
            packedbubble: {
                minSize: '30%',
                maxSize: '100%',
                layoutAlgorithm: {
                    gravitationalConstant: 0.02,
                    splitSeries: false,
                    seriesInteraction: true,
                },
                dataLabels: {
                    enabled: true,
                    format: '<span style="font-size: 30px;color:{point.color};">{point.name}</span><br/> <span style="font-size: 30px;color:{point.color};">{point.y}</span>',//'<b>{point.name}</b>({point.y}) {point.percentage:.1f} %',
                    style: {
                        fontSize: '30px', //这个是改饼状图里面显示的字体 
                        fontWeight: "bold",
                        textOutline: 'none',
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || '#FFFFFF'
                    },
                }
            }
        },
        legend: {
            enabled: false
        },
        series: []
    },
    venn: {
        credits: {
            enabled: false
        },
        chart: {
            type: "venn",
            backgroundColor: "rgba(0,0,0,0)",
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size: 32px;color:{point.color};">{series.name}</span><br/>',
            pointFormat: ' <span style="font-size: 32px;color:{point.color};">{point.name}{point.value}</span><br/>',
            style: {
                fontSize: 32,
                fontWeight: "bold",
                color: (Highcharts.theme && Highcharts.theme.contrastTextColor)
            }
        },
        plotOptions: {
            venn: {
                dataLabels: {
                    enabled: true,
                    // formatter: function (par) {
                    //     console.log(par, 99999)
                    //     return this.point.value
                    // },
                    format: '<span style="font-size: 32px;">{point.name}</span><br/> <span style="font-size: 32px;"></span>',//{point.value}'<b>{point.name}</b>({point.y}) {point.percentage:.1f} %',
                    style: {
                        fontSize: '32px', //这个是改饼状图里面显示的字体 
                        fontWeight: "bold",
                        textOutline: 'none',
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || '#FFFFFF'
                    },
                }
            }
        },
        colors: colorList.theme1,
        series: [{
            type: 'venn',
            name: '',
            data: []
        }],
        title: {
            text: ''
        }
    }
};

class highEchartsUtils {
    getEchartsConfig(type, xAxisData, seriesData, seriesName, yAxisName = "", themname = "") {
        var chartOption = webAPI.utils.deepCopy(config[type]);
        if ("column2" == type) {
            chartOption.series = seriesData;
        } else if ("packedbubble" == type) {
            var temp = {
                name: '',
                data: []
            }
            seriesData.forEach(element => {
                var temp = {
                    name: element.name,
                    data: [{
                        name: element.name,
                        value: element.value
                    }]
                }
                chartOption.series.push(temp);
            });
        } else {
            chartOption.series[0]["data"] = seriesData;
            chartOption.series[0]["name"] = seriesName;
        }
        if (themname != "") {
            chartOption.color = colorList[themname];
        }
        switch (type) {
            case "column2":
                chartOption.yAxis["title"].text = yAxisName;
                chartOption.xAxis["categories"] = xAxisData;
                break;
            case "pie":
                // chartOption.yAxis["title"].text = yAxisName;
                // chartOption.xAxis["categories"] = xAxisData;
                break;
            case "packedbubble":

                break;

        }
        return chartOption;
    }
    chartInit(ID, highChart_Option, autoAction = "") {
        Highcharts.chart(ID, highChart_Option);
    }
    chartClear(ID) { }
}

export default new highEchartsUtils();