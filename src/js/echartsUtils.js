import echarts from "echarts";
let chartfontSize = "12"
var config = {
	column: {
		tooltip: {
			trigger: "axis",
			formatter: "{b} : {c}",
			axisPointer: {
				type: "shadow"
			},
			textStyle: {
				fontSize: chartfontSize,
				fontWeight: "normal"
			}
		},
		title: {
			text: '',
			// top: 20,
			left: 120,
			show: true,
			textStyle: {
				color: '#0aecfa',
				algin: 'center',
				fontSize: chartfontSize
			}
		},
		grid: {
			left: "5%",
			right: "5%",
			bottom: "10%",
			top: "15%",
			containLabel: true
		},
		legend: {
			itemGap: 4,
			itemWidth: 35,
			itemHeight: 25,
			textStyle: {
				color: "#fff",
				fontSize: chartfontSize
			},
			data: [],
			orient: 'vertical',
			x: 'right'
		},
		xAxis: {
			type: "category",
			data: [],
			axisTick: {
				alignWithLabel: true
			},
			axisLine: {
				lineStyle: {
					color: "#212f50"
				}
			},
			axisLabel: {
				color: "#eee",
				rotate: "30",
				textStyle: {
					fontSize: chartfontSize,
					fontWeight: "normal"
				},
			},
		},
		yAxis: {
			position: "left",
			name: "",
			nameTextStyle: {
				color: "#eee",
				fontSize: chartfontSize,
				fontWeight: "normal"
			},
			type: "value",
			splitLine: {
				show: true,
				lineStyle: {
					color: "#4A5459"
				}
			},
			axisLine: {
				lineStyle: {
					color: "#7D8588"
				}
			},
			axisLabel: {
				color: "#eee",
				textStyle: {
					fontSize: chartfontSize,
					fontWeight: "normal"
				},
			}
		},
		series: [{
			name: "",
			type: "bar",
			itemStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
						offset: 0,
						color: "#09B8F9"
					},
					{
						offset: 1,
						color: "#012639"
					}
					]),
				}
			},
			label: {
			},
			barWidth: "20%",
			data: [],
			backgroundStyle: ''
		}]
	},
	pie: {
		title: {
			text: '',
			left: 'center',
			top: 'top',
			shadowColor: 'blue',
			textStyle: {
				color: "#fff",
				fontSize: chartfontSize,
				// fontWeight: "normal"
			},
		},
		tooltip: {
			trigger: "item",
			formatter: "{c} ({d}%)",
			textStyle: {
				fontSize: chartfontSize,
				fontWeight: "bold"
			}
		},
		legend: {
			// icon: "circle",
			itemGap: 4,
			itemWidth: 35,
			itemHeight: 25,
			textStyle: {
				color: "#fff",
				fontSize: chartfontSize
			},
			type: 'scroll',
			orient: "vertical",
			x: "60%",
			y: "center",
			// data: ['123'], 
			// formatter:function(params) { 
			//   console.log(212222222); 
			//   var tip1 = "";
			//   var tip = "";
			//   var size =3;
			//   var le = params.length  //图例文本的长度
			//     if(le > size){   //几个字换行大于几就可以了
			//       var l = Math.ceil(le/size)  //有些不能整除，会有余数，向上取整
			//       for(var i = 1;i <= l;i++){ //循环
			//           if(i < l){ //最后一段字符不能有\n
			//               tip1 += params.slice(i*size-size,i*size)+'\n'; //字符串拼接
			//           }else if(i === l){  //最后一段字符不一定够9个
			//               tip = tip1 + params.slice((l-1)*size,le) //最后的拼接在最后
			//           }
			//       }
			//       return tip;
			//     }else{
			//       tip = params  //前面定义了tip为空，这里要重新赋值，不然会替换为空
			//       return tip;
			//   }
			// }, 
			pagemode: true,
			pageIconColor: '#6495ed', //翻页下一页的三角按钮颜色
			pageIconInactiveColor: '#aaa', //翻页（即翻页到头时）
			pageIconSize: 11,
			pageFormatter: '', //隐藏翻页的数字
			pageButtonItemGap: -6,
		},
		color: ["#57caff", "#fb4349", "#fdee00", "#f55cfe", "#8c5aff", "#4bff5c", "#a040ff", "#00c9b0", "#fd798e"],
		series: [{
			name: "",
			type: "pie",
			center: ['50%', '50%'],
			radius: ["60%", "80%"],
			avoidLabelOverlap: false,
			label: {
				normal: {
					show: false,
					position: "center"
				},
				emphasis: {
					show: true,
					textStyle: {
						fontSize: chartfontSize,
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
	pie2: {
		tooltip: {
			trigger: "item",
			formatter: "{b} : {d}%",
			show: true,
		},
		legend: {
			show: false,
			data: [],
		},
		grid: {},
		series: [
			{
				type: "pie",
				radius: "85%",
				center: ["50%", "50%"],
				color: [
					"#F97824",
					"#FAF215",
					"#8487F6",
					"#00FEFF",
					"#D87E7F",
					"#EDEDED",
					"#55D973",
					"#0B92E7",
					"#BBF703",
					"#319dff",
					"#07B395",
					"#387dee",
					"#bcf702",
					"#8a85ed",
				],
				data: [],
				minAngle: 20, //最小角度
				startAngle: -70, //起始角度
				emphasis: {
					itemStyle: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: "rgba(0, 0, 0, 0.5)",
					},
				},
				labelLine: {
					normal: {
						length: 20, // 改变标示线的长度
						lineStyle: {},
					},
				},
				label: {
					// position: "inside",
					color: "#ffffff",
					textStyle: {
						//这只是为了让文字居中而已
						align: "left", //水平对齐方式可选left，right，center
						baseline: "middle", //垂直对齐方式可选top，bottom，middle
					}, //"{b}\n{c}\n({d}%)",
					fontSize: "14",
				},
			},
		],
	},
	piedouble: {
		tooltip: {
			trigger: "item",
			formatter: "{a} <br/>{b} : {c} ({d}%)",
			axisPointer: {
				type: "shadow"
			},
			textStyle: {
				fontSize: chartfontSize,
				fontWeight: "bold"
			}
		},
		legend: {
			show: false,
			itemGap: 4,
			itemWidth: 35,
			itemHeight: 25,
			textStyle: {
				color: "#fff",
				fontSize: chartfontSize
			},
			orient: "vertical",
			x: "left",
			data: []
		},
		calculable: false,
		color: [
			"#35d4b2",
			"#0b9af4",
			"#e37373",
			"#86E65A",
			"#24D197",
			"#37ACCB",
			"#FB9100",
			"#B0C915",
			"#57caff",
			"#fb4349",
			"#fdee00",
			"#f55cfe",
			"#8c5aff",
			"#4bff5c",
			"#a040ff",
			"#00c9b0",
			"#fd798e",
			"orange",
			"green"
		],
		series: [{
			name: "",
			type: "pie",
			selectedMode: "single",
			radius: [0, 30],
			x: "20%",
			width: "40%",
			funnelAlign: "right",
			label: {
				normal: {
					formatter: "{b}{d}%"
				}
			},
			itemStyle: {
				normal: {
					label: {
						position: "inner",
						formatter: "{b}{d}%"
					},
					labelLine: {
						show: false
					}
				}
			},
			data: []
		},
		{
			name: "",
			type: "pie",
			radius: [60, 80],
			x: "60%",
			width: "35%",
			funnelAlign: "left",
			data: [],
			label: {
				normal: {
					formatter: "{b}{d}%"
				}
			}
		}
		]
	},
	column2: {
		tooltip: {
			trigger: "axis",
			axisPointer: {
				type: "shadow"
			},
			textStyle: {
				fontSize: chartfontSize
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
			itemWidth: 35,
			itemHeight: 25,
			textStyle: {
				color: "#fff",
				fontSize: chartfontSize
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
					color: "#212f50"
				}
			},
			axisLabel: {
				color: "#eee",
				interval: 0,
				rotate: "30",
				textStyle: {
					fontSize: 14
				},
			},
		},
		yAxis: {
			name: "",
			nameTextStyle: {
				color: "#eee",
				fontSize: 14
			},
			type: "value",
			splitLine: {
				show: false
			},
			axisLine: {
				lineStyle: {
					color: "#212f50"
				}
			},
			axisLabel: {
				color: "#eee",
				textStyle: {
					fontSize: 14
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
				fontSize: chartfontSize
			},
		},
		grid: {
			left: "5%",
			right: "5%",
			bottom: "10%",
			top: "15%",
			containLabel: true
		},
		legend: {
			itemGap: 4,
			itemWidth: 35,
			itemHeight: 25,
			textStyle: {
				color: "#fff",
				fontSize: chartfontSize
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
					color: "#212f50"
				}
			},
			axisLabel: {
				color: "#eee",
				interval: 0,
				rotate: "30",
				textStyle: {
					fontSize: 14
				},
			},
		},
		yAxis: [{
			name: "",
			nameTextStyle: {
				color: "#eee",
				fontSize: 14
			},
			type: "value",
			splitLine: {
				show: false
			},
			axisLine: {
				lineStyle: {
					color: "#212f50"
				}
			},
			axisLabel: {
				color: "#eee",
				textStyle: {
					fontSize: 14
				},
			}
		}, {
			name: "",
			nameTextStyle: {
				color: "#eee",
				fontSize: 14
			},
			type: "value",
			splitLine: {
				show: false
			},
			axisLine: {
				lineStyle: {
					color: "#212f50"
				}
			},
			axisLabel: {
				color: "#eee",
				textStyle: {
					fontSize: 14
				},
			}
		}],
		series: [{
			name: "",
			type: "bar",
			yAxisIndex: 0,
			itemStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
						offset: 0,
						color: "#660099"
					},
					{
						offset: 0.5,
						color: "#330099"
					},
					{
						offset: 1,
						color: "#00CCFF"
					}
					])
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
				fontSize: chartfontSize,
				fontWeight: "normal"
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
				color: "#eee",
				fontSize: 12,
				fontWeight: "normal"
			},
			type: "category",
			data: [],
			axisLine: {
				lineStyle: {
					color: "#212f50",
				}
			},
			axisLabel: {
				color: "#eee",
				textStyle: {
					fontSize: 12,
					fontWeight: "normal"
				}
			}
		},
		series: [{
			name: "",
			type: "bar",
			itemStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
						offset: 0,
						color: "#660099"
					},
					{
						offset: 0.5,
						color: "#330099"
					},
					{
						offset: 1,
						color: "#00CCFF"
					}
					])
				}
			},
			barWidth: "60%",
			data: [],
			backgroundStyle: ''
		}]
	},
	line: {
		color: ["#56F1F7"],
		title: {
			text: ''
		},
		tooltip: {
			trigger: "axis",
			formatter: "{b} : {c}",
			axisPointer: {
				type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
			},
			textStyle: {
				fontSize: chartfontSize,
				fontWeight: "normal"
			}
		},
		legend: {
			textStyle: {
				color: "#fff",
				fontSize: chartfontSize
			},
			itemGap: 10,
			itemWidth: 30,
			itemHeight: 25,
			show: false,
			data: []
		},
		grid: {
			left: "5%",
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
					color: "#212f50"
				}
			},
			axisLabel: {
				color: "#eee",
				interval: 0,
				rotate: "30",
				textStyle: {
					fontSize: chartfontSize,
					fontWeight: "normal"
				},
			}
		},
		yAxis: {
			name: "",
			nameTextStyle: {
				color: "#eee",
				fontSize: chartfontSize,
				fontWeight: "normal"
			},
			type: "value",
			splitLine: {
				show: false
			},
			axisLine: {
				lineStyle: {
					color: "#212f50"
				}
			},
			axisLabel: {
				color: "#eee",
				textStyle: {
					fontSize: chartfontSize,
					fontWeight: "normal"
				},
			}
		},
		series: [{
			name: "",
			data: [],
			type: "line",
			smooth: true,
			symbolSize: 12,
			label: {
				normal: {
					show: true,
					position: 'top',
					fontSize: 14,
					color: '#fff',
					offset: [8, -8]
				}
			},
			lineStyle: {
				normal: {
					width: 2,
				}
			},
			areaStyle: {
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					offset: 0,
					color: "rgba(2,67,109,0.4)"
				},
				{
					offset: 1,
					color: "rgba(2,67,109,0.1)"
				}
				])
			}
		}]
	},
	line2: {
		color: ["#3366CC"],
		tooltip: {
			trigger: "axis",
			formatter: "{b} : {c}",
			axisPointer: {
				type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
			},
			textStyle: {
				fontSize: chartfontSize,
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
					color: "#212f50"
				}
			},
			axisLabel: {
				color: "#eee",
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
				color: "#eee",
				fontSize: 12,
			},
			type: "value",
			splitLine: {
				show: false
			},
			axisLine: {
				lineStyle: {
					color: "#212f50"
				}
			},
			axisLabel: {
				color: "#eee",
				textStyle: {
					fontSize: 12,
				},
			}
		}, {
			name: "",
			nameTextStyle: {
				color: "#eee",
				fontSize: 12,
			},
			type: "value",
			splitLine: {
				show: false
			},
			axisLine: {
				lineStyle: {
					color: "#212f50"
				}
			},
			axisLabel: {
				color: "#eee",
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
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					offset: 0,
					color: "rgba(51, 102, 255,0.5)"
				},
				{
					offset: 1,
					color: "rgba(51, 102, 255,0)"
				}
				])
			}
		}],
		legend: {
			itemGap: 4,
			itemWidth: 35,
			itemHeight: 25,
			textStyle: {
				color: "#fff",
				fontSize: chartfontSize
			},
			data: []
		}
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
			radius: "80%",
			axisLine: { // 坐标轴线
				lineStyle: { // 属性lineStyle控制线条样式
					width: 2,
					color: [
						[0.2, new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: "#ff0000"
						},
						{
							offset: 1,
							color: "#ff0066"
						}
						])],
						[0.4, new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: "#ff9900"
						},
						{
							offset: 1,
							color: "#ff9966"
						}
						])],
						[0.6, new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: "#ffff00"
						},
						{
							offset: 1,
							color: "#ffff66"
						}
						])],
						[0.8, new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: "#ff9900"
						},
						{
							offset: 1,
							color: "#cc7200"
						}
						])],
						[1, new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: "#3399ff"
						},
						{
							offset: 1,
							color: "#336666"
						}
						])]
					],
					// shadowColor : '#fff', //默认透明
					// shadowBlur: 10
				}
			},
			axisTick: { // 坐标轴小标记
				splitNumber: 10, // 每份split细分多少段
				length: 12, // 属性length控制线长
				lineStyle: { // 属性lineStyle控制线条样式
					color: '#eee',
					width: 1,
					type: 'solid'
				}
			},
			axisLabel: { // 坐标轴文本标签，详见axis.axisLabel
				show: true,
				textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
					color: '#FFFFFF'
				},
			},
			splitLine: {
				// 分隔线     
			},
			pointer: {
				width: 5,
				length: '80%',
				color: 'auto',
				// shadowColor : '#fff', //默认透明
				// shadowBlur: 10
			},
			title: {
				show: false,
				//offsetCenter: ['0%', 30], // x, y，单位px
				offsetCenter: [0, '-40%'], // x, y，单位px
				textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE        
					fontSize: 12,
					color: '#FFFFFF'
				}
			},
			backgroundColor: {
				type: "pattern",
				repeat: "repeat",
				image: "static/images/dsj/ybp.png" // 赋值
			},
			detail: {
				show: true,
				width: "100%",
				height: "100%",
				//backgroundColor: 'rgba(30,144,255,0.6)',    
				backgroundColor: 'rgba(0,0,0,0)',
				borderWidth: 0,
				borderColor: '#FFFFFF',
				offsetCenter: [0, -35], // x, y，单位px
				formatter: '{value}%',
				textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
					fontSize: 16,
					color: '#FFFFFF',
					fontWeight: 'bolder'
				}
			},
			data: []
		}]
	}

}

var styleConfig = [{
	normal: {
		color: new echarts.graphic.LinearGradient(
			0,
			0,
			0,
			1,
			[
				{
					offset: 0,
					color: "#50F1C5" // 0% 处的颜色
				},
				{
					offset: 1,
					color: "#04D05F" // 100% 处的颜色
				}
			],
			false
		)
		// color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
		// 	offset: 0,
		// 	color: "#15B9FD"
		// },
		// {
		// 	offset: 1,
		// 	color: "#01FEFC"
		// }
		// ])
	}
},
{
	normal: {
		color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
			offset: 0,
			color: "#59E409"
		},
		{
			offset: 1,
			color: "#DFFD01"
		}
		])
	}
},
{
	normal: {
		color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
			offset: 0,
			color: "#39ff5e"
		},
		{
			offset: 1,
			color: "#39ff5e"
		}
		])
	}
},
{
	normal: {
		color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
			offset: 0,
			color: "#cc33cc"
		},
		{
			offset: 1,
			color: "#cc33cc"
		}
		])
	}
},
{
	normal: {
		color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
			offset: 0,
			color: "#ffcc33"
		},
		{
			offset: 1,
			color: "#ffcc33"
		}
		])
	}
},
{
	normal: {
		color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
			offset: 0,
			color: "#ff6666"
		},
		{
			offset: 1,
			color: "#ff6666"
		}
		])
	}
},
{
	normal: {
		color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
			offset: 0,
			color: "#6666ff"
		},
		{
			offset: 1,
			color: "#6666ff"
		}
		])
	}
}
]
class echartsUtils {
	getEchartsConfig(type, xAxisData, seriesData, seriesName, yAxisName = "", style = 1) {
		var chartOption = webAPI.utils.deepCopy(config[type]);
		if ('piedouble' == type) {
			chartOption.series[0]["data"] = seriesData[0];
			chartOption.series[1]["data"] = seriesData[1];
		} else {
			chartOption.series[0]["data"] = seriesData;
			chartOption.series[0]["name"] = seriesName;
		}
		if (style == 2) {
			chartOption.series[0]["label"] = {
				normal: {
					// formatter: "{b}: {c} ({d}%)",
					textStyle: {
						fontSize: chartfontSize,
						fontWeight: 'bold'
					}

				}
			}
		} else if (style == 3) {
			chartOption.series[0]["radius"] = '55%';
		}
		switch (type) {
			case 'column':
				// chartOption.title['text'] = seriesName;
				chartOption.yAxis["name"] = yAxisName;
				chartOption.xAxis["data"] = xAxisData;
				chartOption.tooltip["formatter"] = "{b} : {c}"
				chartOption.series[0].label = {
					normal: {
						show: true,
						position: 'top',
						fontSize: 12,
						color: '#fff',
						offset: [2, -2]
					}
				}
				break;
			case 'pie':
				// chartOption.tooltip["formatter"] = "{a} <br/>{b}: {c}" + yAxisName + " ({d}%)" 
				chartOption.tooltip["formatter"] = "{b}: {c}" + yAxisName + " ({d}%)"
				chartOption.legend["data"] = xAxisData;
				chartOption.series[0]['label']['emphasis'].show = true
				chartOption.series[0]['label']['emphasis'].formatter = '{b} \n {c} \n {d}%'
				chartOption.color = ["#00ebe8", "#f57300", "#39ff5e", "#cc33cc", "#ffcc33", "#ff6666",
					"#6666ff", '#08b495', '#fbf315', '#319dff', '#eeeeee', '#387dee', '#bcf702', '#8a85ed']
				if (xAxisData.length != 0) {
					chartOption.series[0]["center"] = ['30%', '50%']
				}
				if (style == 4) {
					chartOption.legend["itemGap"] = 4
					chartOption.legend["itemWidth"] = 35
					chartOption.legend["itemHeight"] = 25
					chartOption.legend["textStyle"] = {
						color: "#fff",
						fontSize: chartfontSize
					}
				}
				break;
			case 'pie2':
				chartOption.legend["data"] = xAxisData;
				chartOption.legend["textStyle"] = {
					color: "#fff",
					fontSize: chartfontSize
				};
				break;
			case 'piedouble':
				chartOption.tooltip["formatter"] = "{c}" + yAxisName + " ({d}%)"
				chartOption.legend["data"] = xAxisData;
				console.log(chartOption, "dsdjkljlkjlk")
				break
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
		chartOption.series[0]["data"] = seriesData[0];
		chartOption.series[0]["name"] = legendData[0];
		if (stackData) {
			chartOption.series[0]["stack"] = stackData;
		}
		chartOption.tooltip["formatter"] = "";
		if (type != "columnmerge") {
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
				chartOption.legend["data"] = legendData;
			}
		}
		switch (type) {
			case 'column':
				chartOption.yAxis["name"] = yAxisName;
				chartOption.xAxis["data"] = xAxisData;
				// var colorlist = ["#3366CC", "#672D98", "#673ab7", "#07BEF5", "#3f51b5"]
				chartOption.color = ['#0161eb', '#01eb54']
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
				chartOption.color = ['#0161eb', '#01eb54']
				chartOption.yAxis["name"] = yAxisName;
				chartOption.yAxis["data"] = xAxisData;
				break;
			case 'line':
				chartOption.yAxis["name"] = yAxisName;
				chartOption.xAxis["data"] = xAxisData;
				chartOption.legend["data"] = legendData;
				var colorlist = ["#FFF000", "#FF4201", "#21C0F4", "#3f51b5"]
				for (let index = 0; index < chartOption.series.length; index++) {
					chartOption.color[index] = colorlist[index];
				}
				break;
		}
		return chartOption;
	}
	getEchartsConfig_DoublePie(xAxisData, data0, data1) {

		var chartOption = {
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b}: {c} ({d}%)"
			},
			legend: {
				type: 'scroll',
				orient: "vertical",
				x: 'left',
				data: [],
				show: false,
				y: "center",
				textStyle: {
					color: 'white'
				},
				pageIconColor: '#6495ed', //翻页下一页的三角按钮颜色
				pageIconInactiveColor: '#aaa', //翻页（即翻页到头时）
				pageIconSize: 11,
				pageFormatter: '', //隐藏翻页的数字
				pageButtonItemGap: -6
			},
			grid: {
				left: "0%",
				right: "0%",
				bottom: "0%",
				top: "0%",
				containLabel: true
			},
			series: [{
				name: '',
				type: 'pie',
				selectedMode: 'single',
				radius: [0, '40%'],

				label: {
					normal: {
						show: false,
						position: 'inner'
					}
				},
				labelLine: {
					normal: {
						show: false
					}
				},
				data: [],
				center: ['70%', '50%'],
			},
			{

				show: false,
				name: '',
				label: {
					normal: {
						show: false,
						position: 'inner'
					}
				},
				type: 'pie',
				center: ['70%', '50%'],
				radius: ['55%', '75%'],
				data: []
			}
			]
		};
		var colorList = ["#57caff", "#fb4349", "#fdee00", "#f55cfe", "#8c5aff", "#4bff5c", "#a040ff", "#00c9b0", "#fd798e",
			"orange", "green"
		];
		var colorList2 = ["#79E8D0", "#57caff", "#FFB8B8", "#86E65A", "#24D197", "#37ACCB", "#FB9100", "#B0C915", "#FFFFFF"];
		for (let index = 0; index < data0.length; index++) {
			const item = data0[index];
			item.itemStyle = {
				color: colorList[index]
			}
		}
		data1[0].itemStyle = {
			color: colorList2[0]
		}
		var lastParent = data1[0].parent;
		var colorIndex = 0
		for (let index = 1; index < data1.length; index++) {
			const item = data1[index];
			if (item.parent == lastParent) {
				colorIndex = colorIndex + 1;
			} else {
				colorIndex = 0;
			}
			item.itemStyle = {
				color: colorList2[colorIndex]
			}
			lastParent = item.parent
		}
		chartOption.legend.data = xAxisData;
		chartOption.series[0].data = data0;
		chartOption.series[1].data = data1;
		return chartOption;
	}
	getEchartsConfigMerge(type, xAxisData, seriesData, seriesName, yAxisName = "", legendData, stackData) {
		var chartOption = {
			tooltip: {
				trigger: 'axis',
				axisPointer: { // 坐标轴指示器，坐标轴触发有效
					type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				}
			},

			legend: {
				textStyle: {
					color: "#fff",
					fontSize: 12
				},
				data: []
			},
			grid: {
				left: '0%',
				right: '0%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: [{
				show: false,
				type: 'value'
			}],
			yAxis: [{
				type: 'category',
				axisTick: {
					show: false
				},
				data: [],
				splitLine: {
					show: false
				},
				axisLine: {
					lineStyle: {
						color: "#212f50"
					}
				},
				axisLabel: {
					color: "#eee",
					textStyle: {
						fontSize: 12,
						fontWeight: "normal"
					},
				}
			}],
			series: [{
				name: '',
				type: 'bar',
				stack: '总量',
				label: {
					normal: {
						show: true,
						position: "inside",
						color: "#eee",
						formatter: function (params) {
							return -1 * params.value;
						}
					}
				},
				data: []
			},
			{
				name: '',
				type: 'bar',
				stack: '总量',
				label: {
					normal: {
						show: true,
						position: "inside",
						color: "#eee"
					}
				},
				data: []
			}
			]
		}

		for (let index = 0; index < seriesData.length; index++) {
			const element = seriesData[index];
			chartOption.series[index]["data"] = element;

			chartOption.series[index]["name"] = legendData[index];
		}
		for (let index = 0; index < chartOption.series[0]["data"].length; index++) {
			chartOption.series[0]["data"][index] = -1 * chartOption.series[0]["data"][index];

		}

		chartOption.legend["data"] = legendData;
		chartOption.yAxis[0]["data"] = xAxisData;
		for (let index = 0; index < chartOption.series.length; index++) {
			chartOption.series[index]["barWidth"] = "25";
			chartOption.series[index].itemStyle = styleConfig[index]
		}
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
			xAxis: {
				type: 'category',
				data: [],
				axisTick: {
					alignWithLabel: true
				},
				show: false,
				axisLine: {
					lineStyle: {
						color: "#eee"
					}
				},
				axisLabel: {
					color: "#eee",
					textStyle: {
						fontSize: 12,
						fontWeight: "normal"
					},
				},
			},
			yAxis: [{
				type: 'value',
				show: false
			}],
			series: [{
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
			}]
		}

		chartOption.series[0]["data"] = seriesData;
		chartOption.series[0]["name"] = seriesName;
		chartOption.yAxis["name"] = yAxisName;
		chartOption.xAxis["data"] = xAxisData;
		return chartOption;
	}
	//横向图标
	getEchartsConfig_EX2(type, xAxisData, seriesData, seriesName, yAxisName = "", legendData, stackData, yPosition =
		"left") {
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
			chartOption.legend["data"] = legendData;
		}
		switch (type) {
			case 'column':
				chartOption.yAxis["name"] = yAxisName;
				chartOption.xAxis["data"] = xAxisData;
				var colorlist = ["#3366CC", "#672D98", "#673ab7", "#3f51b5", "#07BEF5", "#37a2da", "#ff9f7f"]
				chartOption.color = colorlist;
				for (let index = 0; index < chartOption.series.length; index++) {
					if (!stackData && chartOption.series.length > 2) {
						chartOption.series[index]["barWidth"] = "15%";
					} else {
						chartOption.series[index]["barWidth"] = "25%";
					}
					chartOption.series[index].itemStyle = styleConfig[index]
				}
				chartOption.xAxis["position"] = yPosition;
				chartOption.series.forEach(element => {
					element.label = {
						normal: {
							show: true,
							position: 'insideRight',
							fontSize: 12,
							color: '#fff',
							offset: [5, 2]
						}
					}
				});
				break;
			case 'pie':
				// chartOption.tooltip["formatter"] = "{a} <br/>{b}: {c}" + yAxisName + " ({d}%)"
				chartOption.tooltip["formatter"] = "{c}" + yAxisName + " ({d}%)"
				chartOption.legend["data"] = xAxisData;
				chartOption.series[0]['emphasis']['label'].show = true
				chartOption.series[0]['emphasis']['label'].color = '#ffffff'
				chartOption.series[0]['emphasis']['label'].position = 'center'
				break;
			case 'bar':
				chartOption.yAxis["name"] = yAxisName;
				chartOption.yAxis["data"] = xAxisData;

				break;
			case 'line':
				chartOption.yAxis["name"] = yAxisName;
				chartOption.xAxis["data"] = xAxisData;
				var colorlist = ["#3366CC", "#2196f3", "#673ab7", "#07BEF5", "#3f51b5"]
				for (let index = 0; index < chartOption.series.length; index++) {
					chartOption.color[index] = colorlist[index];
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
	getEchartsConfig_Ball(value) {
		var data = []
		data.push(value)
		data.push(value)
		data.push(value)
		var option = {
			backgroundColor: 'rgb(255,0,255,0.01)',
			series: [{
				type: 'liquidFill',
				radius: '80%',
				data: data,
				backgroundStyle: {
					borderWidth: 5,
					color: 'rgb(255,0,255,0.01)'
				},
				outline: {
					show: false, // 不显示默认的外边框
				},
				color: ['#ffc000', '#62a904', '#00882d',],
				label: {
					normal: {
						formatter: (value * 500).toFixed(0),
						textStyle: {
							fontSize: 12
						}
					}
				}
			}]
		}
		return option;
	}
	getEchartsConfig_EXS(type, xAxisData, seriesData, seriesName, yAxisName, legendData, chartType, lineindex) {
		// var colorlist = ["#3366CC", "#D16914", "#673ab7", "#07BEF5", "#3f51b5"]
		var colorlist = ["#3366CC", "#672D98", "#673ab7", "#3f51b5", "#07BEF5", "#37a2da", "#ff9f7f"] //["#2479F5", "#DE9670", "#FEF845", "#07BEF5", "#3f51b5"]

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
				//chartOption.legend["data"] = legendData
			}
			if (legendData.length - 1 < lineindex) {
				chartOption.yAxis = chartOption.yAxis.splice(0, 1);
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
				if (legendData.length - 1 < lineindex) {
					chartOption.yAxis = chartOption.yAxis.splice(0, 1);
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
				chartOption.color = colorlist;
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
				chartOption.color = ["#3366CC", "#672D98", "#673ab7", "#3f51b5", "#07BEF5", "#37a2da", "#ff9f7f"] //["#3366CC", "#D16914", "#673ab7", "#ff9f7f", "#e062ae", "#00CC99", "#CC3333", "#6633FF"]
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
				var colorlist = ["#3366CC", "#D16914", "#673ab7", "#07BEF5", "#3f51b5"]
				for (let index = 0; index < chartOption.series.length; index++) {
					chartOption.color[index] = colorlist[index];
				}
				break;
		}
		chartOption.legend["data"] = legendData;
		return chartOption;
	}
	getEchartsConfig_EX_WT(type, xAxisData, seriesData, seriesName, yAxisName, legendData, stackData, chartType) {
		var colorlist = ["#00ebe8", "#f57300", "#39ff5e", "#cc33cc", "#ffcc33", "#ff6666", "#6666ff", "#3366CC", "#672D98",
			"#673ab7", "#3f51b5", "#07BEF5", "#37a2da", "#ff9f7f"
		] //["#14b0ff", "#f27a4b", "#44dc5d", "#fe51aa", "#ee5a5a"]

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
					var itemStyle = styleConfig[index]
					itemStyle.normal.barBorderRadius = [2, 2, 0, 0]
					// {
					//   normal: {
					//     barBorderRadius: [2, 2, 0, 0],
					//     color: colorlist[index],
					//   }
					// }
					var seriesItem = new echartsUtils().CreateSeries(element, xAxisData, seriesData[index], "bar");
					seriesItem.itemStyle = itemStyle;
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
				chartOption.color = colorlist;
				var leng = styleConfig.length;
				for (let index = 0; index < chartOption.series.length; index++) {
					chartOption.series[index]["barWidth"] = (chartOption.series.length == 2 ? "20%" : "15%");
					chartOption.series[index].itemStyle = {
						normal: {
							barBorderRadius: [5, 5, 5, 5],
							color: index < leng - 1 ? styleConfig[index].normal.color : colorlist[index],
							// label: {
							// 	show: true
							// }
						}
					}
				}
				break;
			case 'pie':
				//chartOption.color = colorlist;
				// chartOption.tooltip["formatter"] = "{a} <br/>{b}: {c}" + yAxisName + " ({d}%)"
				chartOption.color = colorlist;
				chartOption.tooltip["formatter"] = "{c}" + yAxisName + " ({d}%)"
				chartOption.legend["data"] = xAxisData;
				break;
			case 'bar':
				chartOption.yAxis["name"] = yAxisName;
				chartOption.xAxis["data"] = xAxisData;
				console.log(chartOption, "sflsjlklkjlkjlkjlkjlk");

				break;
			case 'line':
				chartOption.yAxis["name"] = yAxisName;
				chartOption.xAxis["data"] = xAxisData;
				var colorlist = ["#3366CC", "#672D98", "#673ab7", "#3f51b5", "#07BEF5", "#37a2da", "#ff9f7f"] //["#14b0ff", "#f27a4b", "#44dc5d", "#fe51aa", "#ee5a5a"] //["#3366CC", "#D16914", "#673ab7", "#07BEF5", "#3f51b5"]
				for (let index = 0; index < chartOption.series.length; index++) {
					chartOption.color[index] = colorlist[index];
				}
				break;
		}
		return chartOption;
	}
	// 自定义仪表盘
	getEchartConfig_Gauge(value) {
		var degrees = 180 - (180 * value / 100); //蓝色刻度尺计算
		// var degrees = (0 - value) / 2.5 * 30; //蓝色刻度尺计算
		// 蓝色背景
		var num = value / 100;
		var colorSet = [
			[num, 'rgba(4,234,255,0.92)'],
			[1, '#212D43']
		];
		var rich = {
			gray: {
				fontSize: 12,
				color: '#04c7ff',
				padding: 20
			},
			white: {
				fontSize: 12,
				fontWeight: 400,
				color: '#fff',
				fontFamily: 'Acens'
			}
		}
		var option = {
			// backgroundColor: '#11264f',
			series: [{
				name: "白色圈刻度",// 外圈刻度
				type: "gauge",
				radius: "80%",
				splitNumber: 8,
				center: ["50%", "75%"],
				startAngle: 180, //刻度起始
				endAngle: 0, //刻度结束
				z: 4,
				axisTick: {
					show: false
				},
				splitLine: {
					length: 35, //刻度节点线长度
					lineStyle: {
						width: 2,
						color: 'rgba(14,15,20, 0.8)'
					} //刻度节点线
				},
				axisLabel: {
					show: false,
					color: '#',
					fontSize: 12,
				}, //刻度节点文字颜色
				pointer: {
					show: false
				},
				axisLine: {
					lineStyle: {
						opacity: 0
					}
				},
				detail: {
					show: false
				},
				data: [{
					value: 0,
					name: ""
				}]
			},
			{
				name: '蓝圈背景', //刻度背景
				type: 'gauge',
				z: 2,
				radius: '80%',
				splitNumber: 8,
				startAngle: 180,
				endAngle: 0,
				min: 0,
				max: 100,
				center: ["50%", "75%"], //整体的位置设置
				axisLine: { // 坐标轴线
					lineStyle: { // 属性lineStyle控制线条样式
						color: colorSet,
						width: 2,
						opacity: 1, //刻度背景宽度
					}
				},
				splitLine: {
					show: false
				},
				data: [{
					show: false,
					value: '80'
				}],
				axisLabel: {
					show: false,
				},
				pointer: {
					show: false
				},
				axisTick: {
					show: false
				},
				detail: {
					show: 0
				}
			},
			{
				name: '刻度尺', //刻度背景
				type: 'gauge',
				z: 2,
				radius: '50%',
				splitNumber: 8,
				startAngle: 180,
				endAngle: 0,
				// min: 0,
				// max: 15,
				center: ["50%", "75%"], //整体的位置设置
				axisLine: { // 坐标轴线
					lineStyle: { // 属性lineStyle控制线条样式
						color: [
							[0.8, '#00B3FE'],
							[1, '#212D43']
						],
						width: 1,
						opacity: 0, //刻度背景宽度
					}
				},
				data: [{
					show: false,
					value: '80'
				}],
				axisLabel: {
					show: false
				},
				pointer: {
					show: false
				},
				axisTick: {
					show: true,
					lineStyle: {
						color: '#222E48',
						width: 3
					},
					length: 8,
					splitNumber: 10,
				},
				detail: {
					show: 0
				},
				splitLine: {
					length: 3, //刻度节点线长度
					lineStyle: {
						width: 1,
						color: '#222E48'

					} //刻度节点线
				},
			},
			{
				name: '蓝色刻度尺', //刻度背景
				type: 'gauge',
				z: 4,
				radius: '50%',
				splitNumber: 8,
				startAngle: 180,
				endAngle: degrees,
				// min: 0,
				// max: 100,
				center: ["50%", "75%"], //整体的位置设置
				axisLine: { // 坐标轴线
					lineStyle: { // 属性lineStyle控制线条样式
						// color: [
						//     [0.8, '#00B3FE'],
						//     [1, '#212D43']
						// ],
						width: 2,
						opacity: 0, //刻度背景宽度
					}
				},
				data: value,
				axisLabel: {
					show: false
				},
				pointer: {
					show: false
				},
				axisTick: {
					show: true,
					lineStyle: {
						color: '#00B3FE',
						width: 1
					},
					length: 8,
					splitNumber: 10,
				},
				detail: {
					formatter: function (params) {
						return '{gray|' + '已完成' + '\n' + '}{white|' + value + "%" + '}'
					},
					rich: rich,
					offsetCenter: ['0', '-30%'],
				},
				splitLine: {
					length: 3, //刻度节点线长度
					lineStyle: {
						width: 1,
						color: '#00B3FE'
					} //刻度节点线
				},
			},
			{
				name: '蓝圈背景', //刻度背景
				type: 'gauge',
				z: 2,
				radius: '48%',
				splitNumber: 8,
				startAngle: 180,
				endAngle: 0,
				min: 0,
				max: 100,
				center: ["50%", "75%"], //整体的位置设置
				axisLine: { // 坐标轴线
					lineStyle: { // 属性lineStyle控制线条样式
						color: colorSet,
						width: 3,
						opacity: 1, //刻度背景宽度
					}
				},
				splitLine: {
					show: false
				},
				data: [{
					show: false,
					value: '80'
				}],
				axisLabel: {
					show: false,
				},
				pointer: {
					show: false
				},
				axisTick: {
					show: false
				},
				detail: {
					show: 0
				}
			},
			]
		};
		return option;
	}
	getEchartConfig_Gauge2(value) {
		var degrees = 180 - (180 * value / 100); //蓝色刻度尺计算
		// var degrees = (0 - value) / 2.5 * 30; //蓝色刻度尺计算
		// 蓝色背景
		var num = value / 100;
		var colorSet = [
			[num, 'rgba(4,234,255,0.92)'],
			[1, '#212D43']
		];
		var rich = {
			gray: {
				fontSize: 12,
				color: '#04c7ff',
				padding: 20
			},
			white: {
				fontSize: 12,
				fontWeight: 400,
				color: '#fff',
				fontFamily: 'Acens'
			}
		}
		var option = {
			// backgroundColor: '#11264f',
			series: [{
				name: "白色圈刻度",// 外圈刻度
				type: "gauge",
				radius: "100%",
				splitNumber: 6,
				center: ["50%", "70%"],
				startAngle: 180, //刻度起始
				endAngle: 0, //刻度结束
				z: 4,
				axisTick: {
					show: false
				},
				splitLine: {
					length: 35, //刻度节点线长度
					lineStyle: {
						width: 2,
						color: 'rgba(14,15,20, 0.8)'
					} //刻度节点线
				},
				axisLabel: {
					show: false,
					color: '#',
					fontSize: 12,
				}, //刻度节点文字颜色
				pointer: {
					show: false
				},
				axisLine: {
					lineStyle: {
						opacity: 0
					}
				},
				detail: {
					show: false
				},
				data: [{
					value: 0,
					name: ""
				}]
			},
			{
				name: '蓝圈背景', //刻度背景
				type: 'gauge',
				z: 2,
				radius: '100%',
				splitNumber: 6,
				startAngle: 180,
				endAngle: 0,
				min: 0,
				max: 100,
				center: ["50%", "70%"], //整体的位置设置
				axisLine: { // 坐标轴线
					lineStyle: { // 属性lineStyle控制线条样式
						color: colorSet,
						width: 2,
						opacity: 1, //刻度背景宽度
					}
				},
				splitLine: {
					show: false
				},
				data: [{
					show: false,
					value: '80'
				}],
				axisLabel: {
					show: false,
				},
				pointer: {
					show: false
				},
				axisTick: {
					show: false
				},
				detail: {
					show: 0
				}
			},
			{
				name: '刻度尺', //刻度背景
				type: 'gauge',
				z: 2,
				radius: '70%',
				splitNumber: 6,
				startAngle: 180,
				endAngle: 0,
				// min: 0,
				// max: 15,
				center: ["50%", "70%"], //整体的位置设置
				axisLine: { // 坐标轴线
					lineStyle: { // 属性lineStyle控制线条样式
						color: [
							[0.8, '#00B3FE'],
							[1, '#212D43']
						],
						width: 1,
						opacity: 0, //刻度背景宽度
					}
				},
				data: [{
					show: false,
					value: '80'
				}],
				axisLabel: {
					show: false
				},
				pointer: {
					show: false
				},
				axisTick: {
					show: true,
					lineStyle: {
						color: '#222E48',
						width: 3
					},
					length: 6,
					splitNumber: 10,
				},
				detail: {
					show: 0
				},
				splitLine: {
					length: 3, //刻度节点线长度
					lineStyle: {
						width: 1,
						color: '#222E48'

					} //刻度节点线
				},
			},
			{
				name: '蓝色刻度尺', //刻度背景
				type: 'gauge',
				z: 4,
				radius: '70%',
				splitNumber: 6,
				startAngle: 180,
				endAngle: degrees,
				// min: 0,
				// max: 100,
				center: ["50%", "70%"], //整体的位置设置
				axisLine: { // 坐标轴线
					lineStyle: { // 属性lineStyle控制线条样式
						// color: [
						//     [0.8, '#00B3FE'],
						//     [1, '#212D43']
						// ],
						width: 2,
						opacity: 0, //刻度背景宽度
					}
				},
				data: value,
				axisLabel: {
					show: false
				},
				pointer: {
					show: false
				},
				axisTick: {
					show: true,
					lineStyle: {
						color: '#00B3FE',
						width: 1
					},
					length: 6,
					splitNumber: 10,
				},
				detail: {
					formatter: function (params) {
						return '{white|' + value + "%" + '}'
					},
					rich: rich,
					offsetCenter: ['0', '-30%'],
				},
				splitLine: {
					length: 3, //刻度节点线长度
					lineStyle: {
						width: 1,
						color: '#00B3FE'
					} //刻度节点线
				},
			},
			{
				name: '蓝圈背景', //刻度背景
				type: 'gauge',
				z: 2,
				radius: '65%',
				splitNumber: 6,
				startAngle: 180,
				endAngle: 0,
				min: 0,
				max: 100,
				center: ["50%", "70%"], //整体的位置设置
				axisLine: { // 坐标轴线
					lineStyle: { // 属性lineStyle控制线条样式
						color: colorSet,
						width: 1,
						opacity: 1, //刻度背景宽度
					}
				},
				splitLine: {
					show: false
				},
				data: [{
					show: false,
					value: '80'
				}],
				axisLabel: {
					show: false,
				},
				pointer: {
					show: false
				},
				axisTick: {
					show: false
				},
				detail: {
					show: 0
				}
			},
			]
		};
		return option;
	}
	// 螺旋状饼图
	getEchartConfig_Pie(data, color) {
		var arrName = getArrayValue(data, "name");
		var arrValue = getArrayValue(data, "value");
		var sumValue = eval(arrValue.join('+'));
		var objData = array2obj(data, "name");
		var optionData = getData(data)
		function getArrayValue(array, key) {
			var key = key || "value";
			var res = [];
			if (array) {
				array.forEach(function (t) {
					res.push(t[key]);
				});
			}
			return res;
		}

		function array2obj(array, key) {
			var resObj = {};
			for (var i = 0; i < array.length; i++) {
				resObj[array[i][key]] = array[i];
			}
			return resObj;
		}

		function getData(data) {
			var res = {
				series: [],
				yAxis: []
			};
			for (let i = 0; i < data.length; i++) {
				// console.log([70 - i * 15 + '%', 67 - i * 15 + '%']);
				res.series.push({
					name: '',
					type: 'pie',
					clockWise: false, //顺时加载
					hoverAnimation: false, //鼠标移入变大
					radius: [90 - i * 10 + '%', 85 - i * 10 + '%'],
					center: ["50%", "55%"],
					emphasis: {
						label: {
							padding: 10
						}
					},
					label: {
						show: false
					},
					itemStyle: {
						label: {
							show: false,
						},
						labelLine: {
							show: false
						},
						borderWidth: 5,
					},
					data: [{
						value: data[i].value,
						name: data[i].name
					}, {
						value: sumValue - data[i].value,
						name: '',
						itemStyle: {
							color: "rgba(0,0,0,0)",
							borderWidth: 0
						},
						tooltip: {
							show: false
						},
						hoverAnimation: false
					}]
				});
				res.series.push({
					name: '',
					type: 'pie',
					silent: true,
					z: 1,
					clockWise: false, //顺时加载
					hoverAnimation: false, //鼠标移入变大
					radius: [90 - i * 10 + '%', 85 - i * 10 + '%'],
					center: ["50%", "55%"],
					emphasis: {
						label: {
							padding: 10
						}
					},
					label: {
						show: false
					},
					itemStyle: {
						label: {
							show: false,
						},
						labelLine: {
							show: false
						},
						borderWidth: 5,
					},
					data: [{
						value: 7.5,
						itemStyle: {
							color: "rgb(3, 31, 62)",
							borderWidth: 0
						},
						tooltip: {
							show: false
						},
						hoverAnimation: false
					}, {
						value: 2.5,
						name: '',
						itemStyle: {
							color: "rgba(0,0,0,0)",
							borderWidth: 0
						},
						tooltip: {
							show: false
						},
						hoverAnimation: false
					}]
				});
				// res.yAxis.push(data[i].name + '    ' + (data[i].value / sumValue * 100).toFixed(2) + "%");
			}
			return res;
		}

		var option = {
			legend: {
				show: true,
				icon: "circle",
				top: "9%",
				left: '50%',
				data: arrName,
				width: 50,
				padding: [0, 5],
				itemGap: 6,
				formatter: function (name) {
					return "{title|" + name + "} {value|" + (objData[name].value / sumValue * 100).toFixed(2) + "}  {title|%}"
				},
				//   formatter: " {b}  {d}%",
				textStyle: {
					rich: {
						title: {
							fontSize: 14,
							lineHeight: 14,
							color: "rgb(0, 178, 246)"
						},
						value: {
							fontSize: 14,
							lineHeight: 14,
							color: "#fff"
						}
					}
				},
			},
			tooltip: {
				show: true,
				trigger: "item",
				formatter: "{a}<br>{b}:{c}({d}%)"
			},
			color: color,
			grid: {
				top: '16%',
				bottom: '53%',
				left: "51%",
				containLabel: false
			},
			yAxis: [{
				type: 'category',
				inverse: true,
				axisLine: {
					show: false
				},
				axisTick: {
					show: false
				},
				axisLabel: {
					interval: 0,
					inside: true,
					textStyle: {
						color: "#fff",
						fontSize: 14,
						marginBottom: 10
					},
					show: true,

				},
				data: optionData.yAxis
			}],
			xAxis: [{
				show: false
			}],
			series: optionData.series
		};
		return option;
	}
	// 3D柱状图
	getEchartConfig_Bar_3D(xAxisData, seriesData) {
		let img1 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAF8CAYAAABFdgLPAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDM2MCwgMjAyMC8wMi8xMy0wMTowNzoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjEgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjFDNzU4QkMzQjFGRjExRUFBRjkxQTRCMzE0QUM2OTRBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjFDNzU4QkM0QjFGRjExRUFBRjkxQTRCMzE0QUM2OTRBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MUM3NThCQzFCMUZGMTFFQUFGOTFBNEIzMTRBQzY5NEEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MUM3NThCQzJCMUZGMTFFQUFGOTFBNEIzMTRBQzY5NEEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7hhRVqAAAGG0lEQVR42uyZYZLbNgyFCa2mnekxep1eKCfvj0yXrxIJkiAEyXZ2t3bS50Rjry1bn4CHB1CSP//69i2l9Me25VQfSPFDgr9x8hmCfdLF7y/b9veafvyBGwe4ej98rD948C95LOmFHoQhzM8MI4wMYX45GHlGJb1cZNYLUvwX0aCAPzpcyRcNVkKf+cw0fWbK5DNhzmfzabECfSFfGhlzZMj+DERQkkQM04NQD8Bsa7ydoFBA/8PlYju46FaA5CFZro+AIOcO0hegmJUBKMyOtmwgku8GWm+mBXk7gEZkf91hYMAsl5RMygaEXKNT2W5rab0GGdGASRHy9ixHGA1NBdEDyxYVlCjuUMsl0HpXVPrrvDEoJAKYPQpaTSivFH4Dan+JvD0KowcvUck9RfU9mBQ5y1G9dN3srxfz2XIt6lOY/cxLePGux809Og3mUN7dY5Zh8GjzyNKjWlMs98CoTrKJREmLgWmpisqpREQBGkir9qwGUCL0dgcMhj4AB5Kh1WTEbGAEe1pkns+278hSo1x0o9+VIDoBjClljU7VTe5QVbcqZhcZZCkHgujzLuVyQls4NlBBLX1j02cwcFt26dEtV9ODEzGslzTBarCrcPPQVcndcgEDmNSMzb9fISOfgYoX/fdEi0HS/DtRqlYn3aEHE4kSlbw/v5uWYI3Q+ExJkRrfLn7tCFDGmqZlHEdCGBuRHEamv/ZtwjTKanBQRQxzFP2+mMig+/QJTH9WodaI5Oo5TdC9wgIBa/ix6aFIIqt2chXtHrX6G8vBaU4EbLq1Crn7Dqwjz/s35y0HbD6jaajtoVXS0l0+mX61evGepWlOVZ77k1/97V27VJu4GWgIeXrfw3Rrd+IdBmjLHKY1JKcZqYItaSov1IkXJ3qFazYdauaktFNU4q5Rwqcb9oAuIhj9TeTUgc9MUPXTS3u4cd97kTEq9OavWtnDJTL7UCxge5babWxD7Bpqg1YO01QqRsRMCFIiUrv/YiKVTHT233hzMGkcLAXeMr03NctjYKXtk2ZfsScngYiNgGHignnuNVV2cOZg0qua1F4EnfxQB/PRXEcTndNk1I2pZBEKe+4x88TQIyP2u2nqTd2Ne0yg03K4TkMg5nzS2e0ImvsM04Xelzr2N7yE4U2v+WQTsNdMOomOX1S7Mhb7nEZ60rwg3MO0Dr0E6THCts7sx09/9a107TTcukyAYjynPbsRZB1/wcjHLkWMz9ieNM03E4pOh/tUV0vaduseFTPn1OY6ZjGjlVi4yVVBBUlTdFpLmXwk/M3kslC/95EbpirI7JYpbbt/jR2XtvYKGPr+72QMtUbXx4i2nnSDVRd4gptYXDXBVAOSW9hjThtcujqQLpaax0zekrxXGTDACXhaHZqyRaCng5b6mr8OEQ5+LoRhIcktWNwIkYJyhVvgpSk64Q194DBKeOeN9l3uu3Z3xzVFfPyi8WrtfzpPGyHTreFSFfmMyIh0i4QcltBIZsiLrgMjaFNugY/o6gOCKxjjmh/gTuIww1XwNU4JjgebwzaMyw1logPV6OjmgiRcabuTX6JzBNLpWR+hjyciKbrmh5t6fLV7B7izmFyJX5whTq1hdgi/xxIuBO6tWzg4pOv9zhYeZz4zlaDgeFUrOs3pM5yfjODyzsYr3m963DOPXpPMFdAokrftezlP5uWdlXvuvjz8OW8LEoYwhCEMYQhDGMIQhjCEIQxhCEMYwhCGMIQhDGEIQxjCEIYwhCEMYQhDGMIQhjCEIQxhCEMYwhCGMIQhDGEIQxjCEIYwhCEMYQhDGMIQhjCEIQxhCEMYwhCGMIQhDGEIQxjCEIYwhCEMYQhDGMIQhjCEIQxhCEMYwhCGMIQhDGEIQxjCEIYwhCEMYQhDGMIQhjCEIQxhCEMYwhCGMIQhDGEIQxjCEIYwhCEMYQhDGMIQhjCEIQxhCEMYwhCGMIQhDGEIQxjCEIYwhCEMYQhDGMIQhjCEIQxhCEMYwvzKMGBkTmBEXgVGnh0Z+VmrSf7PAv7q6OCVInNSrU9Mk1zASN1g94F84EDyMNi6bb9t2+/b9v5E7b5t2z8bjHxXqPzkQvr+rwADAHQl8Ap9dJvdAAAAAElFTkSuQmCC'
		let color1 = [
			{
				type: 'linear',
				colorStops:
					[{
						offset: 0,
						color: '#11a8ff'
					}, {
						offset: 0.5,
						color: '#09d3fe'
					}, {
						offset: 1,
						color: '#00fffc'
					}]
			},
			{
				type: 'linear',
				colorStops:
					[{
						offset: 0,
						color: '#9e35ff'
					}, {
						offset: 1,
						color: '#02a4e7'
					}]
			},
			{
				type: 'linear',
				colorStops:
					[{
						offset: 0,
						color: '#f26508'
					}, {
						offset: 1,
						color: '#ffa53c'
					}]
			},
			{
				type: 'linear',
				colorStops:
					[{
						offset: 0,
						color: '#0855f2'
					}, {
						offset: 1,
						color: '#3cb8ff'
					}]
			},
			{
				type: 'linear',
				colorStops:
					[{
						offset: 0,
						color: '#088d0e'
					}, {
						offset: 1,
						color: '#3df413'
					}]
			}
		]
		let bgData = []
		seriesData.forEach(item => {
			var tempData = seriesData
			var max = tempData.sort()[0]
			bgData.push(max)
		})
		console.log(bgData)
		let option = {
			// animation: false,
			// backgroundColor: '#000',
			grid: {
				top: 40,
				left: 25,
				bottom: 30,
				right: 25,
				containLabel: true
			},
			xAxis: {
				data: xAxisData,
				axisTick: {
					show: false
				},
				axisLine: {
					lineStyle: {
						color: 'r#0472c5'
					}
				},
				axisLabel: {
					textStyle: {
						color: '#ffffff',
						fontSize: 14,
						fontWeight: 'bold'
					},
					margin: 20
				}
			},
			yAxis: {
				axisTick: {
					show: true
				},
				splitLine: {
					show: true,
					lineStyle: {
						color: '#0472c5'
					}
				},
				axisLine: {
					lineStyle: {
						color: '#0472c5'
					}
				},
				axisLabel: {
					textStyle: {
						color: '#ffffff'
					}
				},
				splitNumber: 10
			},
			series: [{ //空柱子label
				type: 'bar',
				itemStyle: {
					normal: {
						color: 'transparent'
					}
				},
				label: {
					show: true,
					position: 'insideTop',
					distance: -30,
					rich: {
						a: {
							color: 'rgb(2,219,227)',
							fontSize: 14,
							height: 16,
							lineHeight: 16
						}
					}
				},
				z: 5,
				data: seriesData
			}, { //蓝色柱子
				type: 'pictorialBar',
				itemStyle: {
					normal: {
						color: color1
					}
				},
				symbol: 'rect',
				symbolClip: true,
				symbolSize: [35, '100%'],
				symbolOffset: [0, -10],
				symbolPosition: 'start',
				z: 5,
				animation: false,
				data: [{
					value: seriesData[0],
					itemStyle: {
						normal: {
							color: color1[0]
						}
					}
				}, {
					value: seriesData[1],
					itemStyle: {
						normal: {
							color: color1[1]
						}
					}
				}, {
					value: seriesData[2],
					itemStyle: {
						normal: {
							color: color1[2]
						}
					}
				}, {
					value: seriesData[3],
					itemStyle: {
						normal: {
							color: color1[3]
						}
					}
				}, {
					value: seriesData[4],
					itemStyle: {
						normal: {
							color: color1[4]
						}
					}
				}]
			},
			{ //蓝色柱子顶部椭圆
				type: 'pictorialBar',
				itemStyle: {
					normal: {
						color: 'rgb(51,255,207)'
					}
				},
				symbolSize: [35, 10],
				symbolOffset: [0, -5],
				symbolPosition: 'end',
				z: 6,
				animation: false,
				data: [{
					value: seriesData[0],
					itemStyle: {
						normal: {
							color: '#01fdfe'
						}
					}
				}, {
					value: seriesData[1],
					itemStyle: {
						normal: {
							color: '#01c0fe'
						}
					}
				}, {
					value: seriesData[2],
					itemStyle: {
						normal: {
							color: '#ffc64c'
						}
					}
				}, {
					value: seriesData[3],
					itemStyle: {
						normal: {
							color: '#2aa2f7'
						}
					}
				}, {
					value: seriesData[4],
					itemStyle: {
						normal: {
							color: '#30db18'
						}
					}
				}]
			},
			{ //蓝色柱子底部椭圆
				type: 'pictorialBar',
				itemStyle: {
					normal: {
						color: color1
					}
				},
				symbolSize: [35, 30],
				symbolOffset: [0, 5],
				symbolPosition: 'start',
				z: 5,
				animation: false,
				data: [{
					value: seriesData[0],
					itemStyle: {
						normal: {
							color: color1[0]
						}
					}
				}, {
					value: seriesData[1],
					itemStyle: {
						normal: {
							color: color1[1]
						}
					}
				}, {
					value: seriesData[2],
					itemStyle: {
						normal: {
							color: color1[2]
						}
					}
				}, {
					value: seriesData[3],
					itemStyle: {
						normal: {
							color: color1[3]
						}
					}
				}, {
					value: seriesData[4],
					itemStyle: {
						normal: {
							color: color1[4]
						}
					}
				}]
			},
			{ //满的背景柱子
				type: 'pictorialBar',
				symbol: 'image://' + img1,
				symbolClip: true,
				// symbolSize: [35, dom.$el.clientHeight - 136],
				symbolSize: [35, '100%'],
				symbolOffset: [0, -20],
				symbolPosition: 'start',
				z: 2,
				animation: false,
				data: bgData
			}, { //满的顶部椭圆
				type: 'pictorialBar',
				itemStyle: {
					normal: {
						// color: color2
					}
				},
				symbolSize: [35, 10],
				symbolOffset: [0, -5],
				symbolPosition: 'end',
				z: 3,
				animation: false,
				data: bgData
			}
			]
		}
		return option
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
	chartClear(ID) {
		var chart = echarts.init(document.getElementById(ID));
		chart.clear();
		// chart.dispose();  //去掉 echarts动画开始
	}

}
export default new echartsUtils()