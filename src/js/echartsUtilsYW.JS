import echarts from "echarts";
var config = {
  column: {
    tooltip: {
      trigger: "axis",
      formatter: "{b} : {c}",
      axisPointer: {
        type: "shadow"
      },
      textStyle: {
        fontSize: 12,
        fontWeight: "bold"
      },
    },
    grid: {
      left: "5%",
      right: "0%",
      bottom: "10%",
      top: "20%",
      containLabel: true
    },

    legend: {

      itemGap: 4,
      itemWidth: 15,
      itemHeight: 10,
      textStyle: {
        fontSize: 12
      },
      data: []
    },
    xAxis: {
      type: "category",
      data: [],
      axisTick: {
        alignWithLabel: true
      },
      axisLine: {
        lineStyle: {
        }
      },
      axisLabel: {
        // color: "black",
        interval: 0,
        rotate: "30",
        textStyle: {
          fontSize: 12,
          fontWeight: "bold",
        },
      },
    },
    yAxis: {
      name: "",
      nameTextStyle: {
        // color: "black",
        fontSize: 12,
        fontWeight: "bold"
      },
      type: "value",
      splitLine: {
        show: false
      },
      axisLine: {
        lineStyle: {
          // color: "#0d2a72"
        }
      },
      axisLabel: {
        // color: "black",
        textStyle: {
          fontSize: 12,
          fontWeight: "bold",
        },
      }
    },
    series: [{
      name: "",
      type: "bar",
      itemStyle: {
        normal: {
          // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          //   offset: 0,
          //   color: "#0bc581"
          // },
          // {
          //   offset: 1,
          //   color: "#066bb2"
          // }
          // ])
        }
      },
      barWidth: "20%",
      data: []
    }]
  },
  pie: {
    tooltip: {
      trigger: "item",
      // formatter: "{a} <br/>{b}: {c} ({d}%)"
      formatter: "{c} ({d}%)",
      textStyle: {
        fontSize: 12,
        fontWeight: "bold"
      }
    },
    legend: {
      orient: "vertical",
      x: "60%",
      y: "center",
      itemGap: 4,
      itemWidth: 15,
      itemHeight: 10,
      data: [],
      textStyle: {
        // color: "#fff",
        fontSize: 12,
      },
    },
    // color: ["#3ae1c4", "#fb4349", "#ffba34", "#f55cfe", "#4bbaff", "#b5ff5e", "#a040ff", "#00c9b0", "#fd798e"],
    series: [{
      name: "",
      type: "pie",
      center: ['50%', '50%'],
      radius: ["55%", "68%"],
      avoidLabelOverlap: false,
      label: {
        normal: {
          show: false,
          position: "center"
        },
        emphasis: {
          show: true,
          textStyle: {
            fontSize: "16",
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
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      },
      textStyle: {
        fontSize: 12
      },
    },
    grid: {
      left: "0%",
      right: "0%",
      bottom: "10%",
      top: "20%",
      containLabel: true
    },
    legend: {
      itemGap: 4,
      itemWidth: 15,
      itemHeight: 10,
      textStyle: {
        // color: "#fff",
        fontSize: 12
      },
      data: []
    },
    xAxis: {
      type: "category",
      data: [],
      axisTick: {
        alignWithLabel: true
      },
      axisLine: {
        lineStyle: {
          // color: "#333333"
        }
      },
      axisLabel: {
        // color: "#eee",
        interval: 0,
        rotate: "30",
        textStyle: {
          fontSize: 12
        },
      },
    },
    yAxis: {
      name: "",
      nameTextStyle: {
        // color: "#eee",
        fontSize: 12
      },
      type: "value",
      splitLine: {
        show: false
      },
      axisLine: {
        lineStyle: {
          // color: "#333333"
        }
      },
      axisLabel: {
        // color: "#eee",
        textStyle: {
          fontSize: 12
        },
      }
    },
    series: []
  },
  column3: {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      },
      textStyle: {
        fontWeight: "bold",
        fontSize: 12
      },
    },
    grid: {
      left: "5%",
      right: "3%",
      bottom: "10%",
      top: "20%",
      containLabel: true
    },
    legend: {
      itemGap: 4,
      itemWidth: 15,
      itemHeight: 10,
      textStyle: {
        // color: "#fff", 
        fontSize: 12
      },
      data: []
    },
    xAxis: {
      type: "category",
      data: [],
      axisTick: {
        alignWithLabel: true
      },
      axisLine: {
        lineStyle: {
          // color: "black"
        }
      },
      axisLabel: {
        // color: "black",
        interval: 0,
        rotate: "30",
        textStyle: {
          fontWeight: "bold",
          fontSize: 12
        },
      },
    },
    yAxis: [{
      name: "",
      nameTextStyle: {
        // color: "black",
        fontWeight: "bold",
        fontSize: 12
      },
      type: "value",
      splitLine: {
        show: false
      },
      axisLine: {
        lineStyle: {
          // color: "#333333"
        }
      },
      axisLabel: {
        // color: "black",
        textStyle: {
          fontWeight: "bold",
          fontSize: 12
        },
      }
    }, {
      name: "",
      nameTextStyle: {
        // color: "black",
        fontWeight: "bold",
        fontSize: 12
      },
      type: "value",
      splitLine: {
        show: false
      },
      axisLine: {
        lineStyle: {
          // color: "black"
        }
      },
      axisLabel: {
        // color: "black",
        textStyle: {
          fontWeight: "bold",
          fontSize: 12
        },
      }
    }],
    series: [{
      name: "",
      type: "bar",
      yAxisIndex: 0,
      itemStyle: {
        normal: {
          // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          //   offset: 0,
          //   color: "#660099"
          // },
          // {
          //   offset: 0.5,
          //   color: "#330099"
          // },
          // {
          //   offset: 1,
          //   color: "#00CCFF"
          // }
          // ])
        }
      },
      barWidth: "60%",
      data: []
    }]
  },
  bar: {
    tooltip: {
      trigger: "axis",
      formatter: "{b} : {c}",
      axisPointer: {
        type: "shadow"
      },
      textStyle: {
        fontSize: 12,
        fontWeight: "bold"
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      top: "10%",
      containLabel: true
    },
    xAxis: {
      show: false,
    },
    yAxis: {
      name: "",
      nameTextStyle: {
        // color: "#eee",
        fontSize: 12,
        fontWeight: "bold"
      },
      type: "category",
      data: [],
      axisLine: {
        lineStyle: {
          // color: "#333333",
        }
      },
      axisLabel: {
        // color: "#eee",
        textStyle: {
          fontSize: 12,
          fontWeight: "bold"
        }
      }
    },
    series: [{
      name: "",
      type: "bar",
      itemStyle: {
        normal: {
          // color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
          //   offset: 0,
          //   color: "#660099"
          // },
          // {
          //   offset: 0.5,
          //   color: "#330099"
          // },
          // {
          //   offset: 1,
          //   color: "#00CCFF"
          // }
          // ])
        }
      },
      barWidth: "60%",
      data: []
    }]
  },
  line: {
    // color: ["#3366CC"],
    tooltip: {
      trigger: "axis",
      formatter: "{b} : {c}",
      axisPointer: {
        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
      },
      textStyle: {
        fontSize: 12,
        fontWeight: "bold"
      }
    },
    legend: {
      itemGap: 4,
      itemWidth: 15,
      itemHeight: 10,
      textStyle: {
        // color: "#fff", 
        fontSize: 12
      },
      data: []
    },
    grid: {
      left: "0%",
      right: "0%",
      bottom: "10%",
      top: "20%",
      containLabel: true
    },
    xAxis: {
      type: "category",
      data: [],
      axisLine: {
        lineStyle: {
          // color: "#333333"
        }
      },
      axisLabel: {
        // color: "#eee",
        interval: 0,
        rotate: "30",
        textStyle: {
          fontSize: 12,
          fontWeight: "bold"
        },
      }
    },
    yAxis: {
      name: "",
      nameTextStyle: {
        // color: "#eee",
        fontSize: 12,
        fontWeight: "bold"
      },
      type: "value",
      splitLine: {
        show: false
      },
      axisLine: {
        lineStyle: {
          // color: "#333333"
        }
      },
      axisLabel: {
        // color: "#eee",
        textStyle: {
          fontSize: 12,
          fontWeight: "bold"
        },
      }
    },
    series: [{
      name: "",
      data: [],
      type: "line",
      smooth: true,
      areaStyle: {
        // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        //   offset: 0,
        //   color: "rgba(51, 102, 255,0.5)"
        // },
        // {
        //   offset: 1,
        //   color: "rgba(51, 102, 255,0)"
        // }
        // ])
      }
    }]
  },
  line2: {
    // color: ["#3366CC"],
    tooltip: {
      trigger: "axis",
      formatter: "{b} : {c}",
      axisPointer: {
        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
      },
      textStyle: {
        fontSize: 12,
      }
    },
    grid: {
      left: "0%",
      right: "0%",
      bottom: "10%",
      top: "20%",
      containLabel: true
    },
    xAxis: {
      type: "category",
      data: [],
      axisLine: {
        lineStyle: {
          // color: "#333333"
        }
      },
      axisLabel: {
        // color: "#eee",
        interval: 0,
        rotate: "30",
        textStyle: {
          fontSize: 12,
        },
      }
    },
    yAxis: [{
      name: "",
      nameTextStyle: {
        // color: "#eee",
        fontSize: 12,
      },
      type: "value",
      splitLine: {
        show: false
      },
      axisLine: {
        lineStyle: {
          // color: "#333333"
        }
      },
      axisLabel: {
        // color: "#eee",
        textStyle: {
          fontSize: 12,
        },
      }
    }, {
      name: "",
      nameTextStyle: {
        // color: "#eee",
        fontSize: 12,
      },
      type: "value",
      splitLine: {
        show: false
      },
      axisLine: {
        lineStyle: {
          // color: "#333333"
        }
      },
      axisLabel: {
        // color: "#eee",
        textStyle: {
          fontSize: 12,
        },
      }
    }],
    series: [{
      name: "",
      data: [],
      type: "line",
      smooth: true,
      yAxisIndex: 0,
      areaStyle: {
        // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        // offset: 0,
        // color: "rgba(51, 102, 255,0.5)"
        // },
        // {
        //   offset: 1,
        //   color: "rgba(51, 102, 255,0)"
        // }
        // ])
      }
    }]
  },
  gauge: {
    tooltip: {
      formatter: "{a} <br/>{b} : {c}%"
    },
    series: [{
      name: '',
      type: 'gauge',
      startAngle: 180,
      endAngle: 0,
      center: ['50%', '80%'], // 默认全局居中
      radius: 150,
      axisLine: {            // 坐标轴线
        lineStyle: {       // 属性lineStyle控制线条样式
          width: 4,
          // color: [[0.5, new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          //   offset: 0,
          //   color: "#ffe30f"
          // },
          // {
          //   offset: 1,
          //   color: "#cc7200"
          // }
          // ])],
          // [1, new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          //   offset: 0,
          //   color: "#ffe30f"
          // },
          // {
          //   offset: 1,
          //   color: "#cc7200"
          // }
          // ])]
          // ]
        }
      },
      axisTick: { // 坐标轴小标记
        splitNumber: 10, // 每份split细分多少段
        length: 18, // 属性length控制线长
        lineStyle: { // 属性lineStyle控制线条样式
          // color: '#eee',
          width: 1,
          type: 'solid'
        }
      },
      axisLabel: { // 坐标轴文本标签，详见axis.axisLabel
        show: true,
        textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
          // color: '#FFFFFF'
        }
      },
      pointer: {
        width: 10,
        length: '80%',
        color: 'auto',
      },
      title: {
        show: true,
        //offsetCenter: ['0%', 30], // x, y，单位px
        offsetCenter: [0, '-40%'], // x, y，单位px
        textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE        
          fontSize: 12,
          // color: '#FFFFFF'
        }
      },
      detail: {
        show: true,
        backgroundColor: 'rgba(0,0,0,0)',
        borderWidth: 0,
        borderColor: '#ccc',
        width: 100,
        height: 40,
        offsetCenter: [0, -40], // x, y，单位px
        formatter: '{value}%',
        textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
          fontSize: 12,
          // color: '#FFFFFF',
        }
      },
      data: []
    }]
  }
}

var styleConfig = [

  // {
  //   normal: {
  //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
  //       offset: 0,
  //       color: "#00ebe8"
  //     },
  //     {
  //       offset: 1,
  //       color: "#00ebe8"
  //     }
  //     ])
  //   }
  // },
  // {
  //   normal: {
  //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
  //       offset: 0,
  //       color: "#f57300"
  //     },
  //     {
  //       offset: 1,
  //       color: "#f57300"
  //     }
  //     ])
  //   }
  // },
  // {
  //   normal: {
  //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
  //       offset: 0,
  //       color: "#39ff5e"
  //     },
  //     {
  //       offset: 1,
  //       color: "#39ff5e"
  //     }
  //     ])
  //   }
  // }
  // ,
  // {
  //   normal: {
  //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
  //       offset: 0,
  //       color: "#cc33cc"
  //     },
  //     {
  //       offset: 1,
  //       color: "#cc33cc"
  //     }
  //     ])
  //   }
  // },
  // {
  //   normal: {
  //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
  //       offset: 0,
  //       color: "#ffcc33"
  //     },
  //     {
  //       offset: 1,
  //       color: "#ffcc33"
  //     }
  //     ])
  //   }
  // }
  // ,
  // {
  //   normal: {
  //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
  //       offset: 0,
  //       color: "#ff6666"
  //     },
  //     {
  //       offset: 1,
  //       color: "#ff6666"
  //     }
  //     ])
  //   }
  // },
  // {
  //   normal: {
  //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
  //       offset: 0,
  //       color: "#6666ff"
  //     },
  //     {
  //       offset: 1,
  //       color: "#6666ff"
  //     }
  //     ])
  //   }
  // }
]
class echartsUtils {
  getEchartsConfig(type, xAxisData, seriesData, seriesName, yAxisName = "", style = 1) {
    var chartOption = webAPI.utils.deepCopy(config[type]);
    chartOption.series[0]["data"] = seriesData;
    chartOption.series[0]["name"] = seriesName;
    if (style == 2) {
      chartOption.series[0]["label"] = {
        normal: {
          formatter: "{b}: {c} ({d}%)",
          textStyle: {
            fontSize: '14',
            fontWeight: 'bold'
          }

        }
      }
    } else if (style == 3) {
      chartOption.series[0]["radius"] = '55%';
    }
    switch (type) {
      case 'column':
        chartOption.yAxis["name"] = yAxisName;
        chartOption.xAxis["data"] = xAxisData;
        break;
      case 'pie':
        // chartOption.tooltip["formatter"] = "{a} <br/>{b}: {c}" + yAxisName + " ({d}%)"
        chartOption.tooltip["formatter"] = "{c}" + yAxisName + " ({d}%)"
        chartOption.legend["data"] = xAxisData;
        if (xAxisData.length != 0) {
          chartOption.series[0]["center"] = ['30%', '50%']
        }
        break;
      case 'bar':
        chartOption.yAxis["name"] = yAxisName;
        chartOption.yAxis["data"] = xAxisData;
        break;
      case 'line':
        chartOption.yAxis["name"] = yAxisName;
        chartOption.xAxis["data"] = xAxisData;
        break;
      case 'gauge':
        chartOption.series[0]["detail"]["formatter"] = yAxisName;
        break;
    }
    return chartOption;
  }
  getEchartsConfig_EX(type, xAxisData, seriesData, seriesName, yAxisName = "", legendData, stackData) {
    var chartOption = webAPI.utils.deepCopy(config[type]);
    chartOption.legend["data"] = legendData;
    chartOption.series[0]["data"] = seriesData[0];
    chartOption.series[0]["name"] = legendData[0];
    if (stackData) {
      chartOption.series[0]["stack"] = stackData;
    }
    chartOption.tooltip["formatter"] = "";
    if (legendData.length > 1) {
      for (let index = 1; index < seriesData.length; index++) {
        var element = seriesData[index];
        var {
          ...seriesCopy
        } = chartOption.series[0];
        seriesCopy.data = element;
        seriesCopy.name = legendData[index];
        chartOption.series.push(seriesCopy);
      }
    }
    switch (type) {
      case 'column':
        chartOption.yAxis["name"] = yAxisName;
        chartOption.xAxis["data"] = xAxisData;
        var colorlist = ["#3366CC", "#672D98", "#673ab7", "#ffc107", "#3f51b5"]
        // chartOption.color = colorlist;
        for (let index = 0; index < chartOption.series.length; index++) {
          chartOption.series[index]["barWidth"] = (chartOption.series.length == 2 ? "30%" : "20%");
          chartOption.series[index].itemStyle = styleConfig[index]
        }
        break;
      case 'pie':
        // chartOption.tooltip["formatter"] = "{a} <br/>{b}: {c}" + yAxisName + " ({d}%)"
        chartOption.tooltip["formatter"] = "{c}" + yAxisName + " ({d}%)"
        chartOption.legend["data"] = xAxisData;
        break;
      case 'bar':
        chartOption.yAxis["name"] = yAxisName;
        chartOption.yAxis["data"] = xAxisData;
        break;
      case 'line':
        chartOption.yAxis["name"] = yAxisName;
        chartOption.xAxis["data"] = xAxisData;
        var colorlist = ["#3366CC", "#2196f3", "#673ab7", "#ffc107", "#3f51b5"]
        for (let index = 0; index < chartOption.series.length; index++) {
          // chartOption.color[index] = colorlist[index];
        }
        break;
    }

    return chartOption;
  }

  //横向图标
  getEchartsConfig_EX2(type, xAxisData, seriesData, seriesName, yAxisName = "", legendData, stackData, yPosition = "left") {
    var chartOption = webAPI.utils.deepCopy(config[type]);
    chartOption.legend["data"] = legendData;
    chartOption.series[0]["data"] = seriesData[0];
    chartOption.series[0]["name"] = legendData[0];
    if (stackData) {
      chartOption.series[0]["stack"] = stackData;
    }
    chartOption.tooltip["formatter"] = "";
    if (legendData.length > 1) {
      for (let index = 1; index < seriesData.length; index++) {
        var element = seriesData[index];
        var {
          ...seriesCopy
        } = chartOption.series[0];
        seriesCopy.data = element;
        seriesCopy.name = legendData[index];
        chartOption.series.push(seriesCopy);
      }
    }
    switch (type) {
      case 'column':
        chartOption.yAxis["name"] = yAxisName;
        chartOption.xAxis["data"] = xAxisData;
        var colorlist = ["#3366CC", "#672D98", "#673ab7", "#3f51b5", "#ffc107", "#37a2da", "#ff9f7f"]
        // chartOption.color = colorlist;
        for (let index = 0; index < chartOption.series.length; index++) {
          chartOption.series[index]["barWidth"] = "25%";
          chartOption.series[index].itemStyle = styleConfig[index]
        }
        chartOption.xAxis["position"] = yPosition;
        break;
      case 'pie':
        // chartOption.tooltip["formatter"] = "{a} <br/>{b}: {c}" + yAxisName + " ({d}%)"
        chartOption.tooltip["formatter"] = "{c}" + yAxisName + " ({d}%)"
        chartOption.legend["data"] = xAxisData;
        break;
      case 'bar':
        chartOption.yAxis["name"] = yAxisName;
        chartOption.yAxis["data"] = xAxisData;
        break;
      case 'line':
        chartOption.yAxis["name"] = yAxisName;
        chartOption.xAxis["data"] = xAxisData;
        var colorlist = ["#3366CC", "#2196f3", "#673ab7", "#ffc107", "#3f51b5"]
        for (let index = 0; index < chartOption.series.length; index++) {
          // chartOption.color[index] = colorlist[index];
        }
        break;
    }
    var tempData = chartOption.yAxis;
    chartOption.yAxis = chartOption.xAxis;
    chartOption.xAxis = tempData;
    //横轴倾斜，纵轴不倾斜显示 
    chartOption.xAxis.axisLabel.rotate = "30";
    chartOption.xAxis.axisLabel.interval = 0;
    chartOption.yAxis.axisLabel.rotate = "0";
    chartOption.yAxis.axisLabel.interval = 0;
    return chartOption;
  }
  getEchartsConfig_NoAxis(type, xAxisData, seriesData, seriesName, yAxisName = "") {
    var chartOption = {
      color: "green",
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: "8%",
        right: "0%",
        bottom: "0%",
        top: "12%",
      },
      xAxis:
      {
        type: 'category',
        data: [],
        axisTick: {
          alignWithLabel: true
        },
        show: false,
        axisLine: {
          lineStyle: { 
          }
        },
        axisLabel: { 
          textStyle: {
            fontSize: 12,
            fontWeight: "normal"
          },
        },
      }
      ,
      yAxis: [
        {
          type: 'value',
          show: false
        }
      ],
      series: [
        {
          barWidth: "50%",
          name: '',
          type: 'bar',
          data: [],
          itemStyle: {
            normal: {
              color: function (params) {
                if (params.data.level == "优") {
                  return "#00882d";
                } else if (params.data.level == "良") {
                  return "#ffc000";
                } else if (params.data.level == "轻度污染") {
                  return "#f1621b";
                } else if (params.data.level == "中度污染") {
                  return "#c71919";
                } else if (params.data.level == "重度污染") {
                  return "#7123ac";
                } else if (params.data.level == "严重污染") {
                  return "#7a2500";
                }
                return "#00882d";
              }
            }
          }
        }
      ]
    }

    chartOption.series[0]["data"] = seriesData;
    chartOption.series[0]["name"] = seriesName;
    chartOption.yAxis["name"] = yAxisName;
    chartOption.xAxis["data"] = xAxisData;
    return chartOption;
  }
  getEchartsConfig_EXS(type, xAxisData, seriesData, seriesName, yAxisName, legendData, chartType, lineindex) {
    // var colorlist = ["#3366CC", "#D16914", "#673ab7", "#ffc107", "#3f51b5"]
    var colorlist = ["#2479F5", "#DE9670", "#FEF845", "#ffc107", "#3f51b5"]

    if (chartType == 1) {
      var seriesArr = []
      for (let index = 0; index < legendData.length; index++) {
        const element = legendData[index];
        var itemStyle = styleConfig[index];
        var seriesItem = new echartsUtils().CreateSeries(element, xAxisData, seriesData[index], "bar");
        seriesItem.itemStyle = itemStyle;
        chartOption.series[index].itemStyle = styleConfig[index]
        seriesArr.push(seriesItem);
      }
      var chartOption = webAPI.utils.deepCopy(config['column2']);
      chartOption.legend["data"] = legendData
      chartOption.series = seriesArr;
    } else if (chartType == 2) {
      var chartOption = webAPI.utils.deepCopy(config['column3']);
      chartOption.series[0]["data"] = seriesData[0];
      chartOption.series[0]["name"] = legendData[0];
      chartOption.tooltip["formatter"] = "";
      if (legendData.length > 1) {
        for (let index = 1; index < seriesData.length; index++) {
          var element = seriesData[index];
          var {
            ...seriesCopy
          } = chartOption.series[0];
          if (index < lineindex) {
            seriesCopy.data = element;
            seriesCopy.name = legendData[index];
            chartOption.series.push(seriesCopy);
          } else {
            seriesCopy.type = "line"
            seriesCopy.yAxisIndex = 1
            seriesCopy.data = element;
            seriesCopy.name = legendData[lineindex];
            chartOption.series.push(seriesCopy);
          }
        }
        chartOption.legend["data"] = legendData
      }

    } else if (chartType == 3) {
      var chartOption = webAPI.utils.deepCopy(config['line2']);
      chartOption.series[0]["data"] = seriesData[0];
      chartOption.series[0]["name"] = legendData[0];
      chartOption.tooltip["formatter"] = "";
      if (legendData.length > 1) {
        for (let index = 1; index < seriesData.length; index++) {
          var element = seriesData[index];
          var {
            ...seriesCopy
          } = chartOption.series[0];
          seriesCopy.data = element;
          seriesCopy.name = legendData[index];
          if (index >= lineindex) {
            seriesCopy.yAxisIndex = 1
          }
          chartOption.series.push(seriesCopy);
        }
      }
    } else {

    }
    switch (type) {
      case 'column':
        if (chartOption.yAxis.length == 2) {
          chartOption.yAxis[0]["name"] = yAxisName[0];
          chartOption.yAxis[1]["name"] = yAxisName[1];
        } else {
          chartOption.yAxis["name"] = yAxisName;
        }
        chartOption.xAxis["data"] = xAxisData;
        // chartOption.color = colorlist;
        for (let index = 0; index < chartOption.series.length; index++) {
          chartOption.series[index]["barWidth"] = (chartOption.series.length == 2 ? "30%" : "20%");
          chartOption.series[index].itemStyle = styleConfig[index]

        }
        break;
      case 'pie':
        //chartOption.color = colorlist;
        // chartOption.tooltip["formatter"] = "{a} <br/>{b}: {c}" + yAxisName + " ({d}%)"
        chartOption.tooltip["formatter"] = "{c}" + yAxisName + " ({d}%)"
        chartOption.legend["data"] = xAxisData;
        // chartOption.color = ["#3366CC", "#D16914", "#673ab7", "#ff9f7f", "#e062ae", "#00CC99", "#CC3333", "#6633FF"]
        break;
      case 'bar':
        chartOption.yAxis["name"] = yAxisName;
        chartOption.xAxis["data"] = xAxisData;

        break;
      case 'line':
        if (chartOption.yAxis.length == 2) {
          chartOption.yAxis[0]["name"] = yAxisName[0];
          chartOption.yAxis[1]["name"] = yAxisName[1];
        } else {
          chartOption.yAxis["name"] = yAxisName;
        }
        chartOption.xAxis["data"] = xAxisData;
        // var colorlist = ["#3366CC", "#D16914", "#673ab7", "#ffc107", "#3f51b5"]
        // for (let index = 0; index < chartOption.series.length; index++) {
        //   chartOption.color[index] = colorlist[index];
        // } 
        break;
    }
    return chartOption;
  }
  
  getEchartsConfig_EX_WT(type, xAxisData, seriesData, seriesName, yAxisName, legendData, stackData, chartType) {  
    // var colorlist = ["#00ebe8","#f57300","#39ff5e","#cc33cc","#ffcc33","#ff6666","#6666ff"] //["#3366CC", "#672D98", "#673ab7", "#3f51b5", "#ffc107", "#37a2da", "#ff9f7f"]//["#14b0ff", "#f27a4b", "#44dc5d", "#fe51aa", "#ee5a5a"]
    
    // {
    //   normal: {
    //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
    //       offset: 0,
    //       color: "#00ebe8"
    //     },
    //     {
    //       offset: 1,
    //       color: "#00ebe8"
    //     }
    //     ])
    //   }
    // }
    
    if (legendData.length > 0) {
      if (chartType == 1) {
        var seriesArr = []
        for (let index = 0; index < legendData.length; index++) {
          const element = legendData[index];
        //   var itemStyle = styleConfig[index]
        //   itemStyle.normal.barBorderRadius = [2, 2, 0, 0]
          // {
          //   s: {
          //     barBorderRadius: [2, 2, 0, 0],
          //     color: colorlist[index],
          //   }
          // }
          var seriesItem = new echartsUtils().CreateSeries(element, xAxisData, seriesData[index], "bar");
        //   seriesItem.itemStyle = itemStyle;
          seriesArr.push(seriesItem);
        }
        var chartOption = webAPI.utils.deepCopy(config['column2']);
        chartOption.legend["data"] = legendData
        chartOption.series = seriesArr;
      } else {
        var chartOption = webAPI.utils.deepCopy(config[type]);
        chartOption.series[0]["data"] = seriesData[0];
        chartOption.series[0]["name"] = legendData[0];
        if (stackData) {
          chartOption.series[0]["stack"] = stackData;
        }
        chartOption.tooltip["formatter"] = "";
        if (legendData.length > 1) {
          for (let index = 1; index < seriesData.length; index++) {
            var element = seriesData[index];
            var {
              ...seriesCopy
            } = chartOption.series[0];
            seriesCopy.data = element;
            seriesCopy.name = legendData[index];
            chartOption.series.push(seriesCopy);
          }
        }
      }
    } else {
      var chartOption = webAPI.utils.deepCopy(config[type]);
      chartOption.series[0]["data"] = seriesData;
      chartOption.series[0]["name"] = seriesName;
    }
    switch (type) {
      case 'column':
        chartOption.yAxis["name"] = yAxisName;
        chartOption.xAxis["data"] = xAxisData;
        // chartOption.color = colorlist;
        // for (let index = 0; index < chartOption.series.length; index++) {
        //   chartOption.series[index]["barWidth"] = (chartOption.series.length == 2 ? "20%" : "15%");
        // //   chartOption.series[index].itemStyle = itemStyle = {
        //     // normal: {
        //     //   barBorderRadius: [2, 2, 0, 0],
        //     //   color:styleConfig[index].normal.color
        //     // }
        // //   }
        // }
        break;
      case 'pie':
        //chartOption.color = colorlist;
        // chartOption.tooltip["formatter"] = "{a} <br/>{b}: {c}" + yAxisName + " ({d}%)"
        chartOption.tooltip["formatter"] = "{c}" + yAxisName + " ({d}%)"
        chartOption.legend["data"] = xAxisData;
        // chartOption.color = ["#00ebe8","#f57300","#39ff5e","#cc33cc","#ffcc33","#ff6666","#6666ff"]//["#3366CC", "#672D98", "#673ab7", "#3f51b5", "#ffc107", "#37a2da", "#ff9f7f"]//["#14b0ff", "#f27a4b", "#44dc5d", "#fe51aa", "#ee5a5a", "#00CC99", "#CC3333", "#6633FF"] //["#3366CC", "#D16914", "#673ab7", "#ff9f7f", "#e062ae", "#00CC99", "#CC3333", "#6633FF"]
        
        break;
      case 'bar':
        chartOption.yAxis["name"] = yAxisName;
        chartOption.xAxis["data"] = xAxisData;
        console.log(chartOption, "sflsjlklkjlkjlkjlkjlk");

        break;
      case 'line':
        chartOption.yAxis["name"] = yAxisName;
        chartOption.xAxis["data"] = xAxisData;
        // var colorlist =  ["#3366CC", "#672D98", "#673ab7", "#3f51b5", "#ffc107", "#37a2da", "#ff9f7f"] //["#14b0ff", "#f27a4b", "#44dc5d", "#fe51aa", "#ee5a5a"] //["#3366CC", "#D16914", "#673ab7", "#ffc107", "#3f51b5"]
        // for (let index = 0; index < chartOption.series.length; index++) {
        //   chartOption.color[index] = colorlist[index];
        // }
        break;
    }
    return chartOption;
  }
  CreateSeries(seriesName, datacode, seriesdata, type) {
    if (type == "bar") {
      var seriesItem = {
        name: seriesName,
        type: 'bar',
        stack: '总量',
        barWidth: "30%",
        //x: '10',
        datauser: datacode,
        itemStyle: {},
        data: seriesdata,
        markLine: {
          data: [{
            type: 'average',
            name: '平均值'
          }]
        }
      }
      return seriesItem;
    } else if (type == "line") {
      var seriesItem2 = {
        name: seriesName,
        type: 'line',
        data: seriesdata,
        datacode: datacode
      }
      return seriesItem2;
    }
  }
  autoDispatchAction(chart, dataLength) {
    var currentIndex = -1;
    ///初始化选中
    // 取消之前高亮的图形
    chart.dispatchAction({
      type: "downplay",
      seriesIndex: 0,
      dataIndex: currentIndex
    });
    currentIndex = (currentIndex + 1) % dataLength;
    // 高亮当前图形
    chart.dispatchAction({
      type: "highlight",
      seriesIndex: 0,
      dataIndex: currentIndex
    });
    // 显示 tooltip
    chart.dispatchAction({
      type: "showTip",
      seriesIndex: 0,
      dataIndex: currentIndex
    });
    return setInterval(function () {
      // 取消之前高亮的图形
      chart.dispatchAction({
        type: "downplay",
        seriesIndex: 0,
        dataIndex: currentIndex
      });
      currentIndex = (currentIndex + 1) % dataLength;
      // 高亮当前图形
      chart.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: currentIndex
      });
      // 显示 tooltip
      chart.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: currentIndex
      });
    }, 6000);
  }
  chartInit(ID, chart_Option, autoAction = "") {
    var chart = echarts.init(document.getElementById(ID));
    chart.setOption(chart_Option);
    if (autoAction == "") {
      return this.autoDispatchAction(
        chart,
        chart_Option.series[0].data.length
      );
    }
  }

}
export default new echartsUtils()
