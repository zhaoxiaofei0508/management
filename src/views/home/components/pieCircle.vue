<template>
	<div :class="className" :style="{height:height,width:width}" style="display: inline-block;" />
</template>

<script>
	import echarts from 'echarts'
	require('echarts/theme/macarons') // echarts theme
	import { debounce } from '@/utils'

	export default {
		props: {
			className: {
				type: String,
				default: 'chart'
			},
			data1: {},
			data2: {},
			data3: {},
			width: {
				type: String,
				default: '350px'
			},
			height: {
				type: String,
				default: '150px'
			}
		},
		data() {
			return {
				chart: null
			}
		},
		mounted() {
			this.initChart()
			this.__resizeHandler = debounce(() => {
				if(this.chart) {
					this.chart.resize()
				}
			}, 100)
			window.addEventListener('resize', this.__resizeHandler)
		},
		beforeDestroy() {
			if(!this.chart) {
				return
			}
			window.removeEventListener('resize', this.__resizeHandler)
			this.chart.dispose()
			this.chart = null
		},
		methods: {
			initChart() {
				this.chart = echarts.init(this.$el, 'macarons')
				this.chart.setOption({
					calculable: true,
					legend: {
						right: 'right',
						bottom: '0',
						data: [this.data1.name, this.data2.name, this.data3.name]
					},
					tooltip: {
						trigger: 'item',
						formatter: '{b} : {c} ({d}%)'
					},
					series: [{
						type: 'pie',
						avoidLabelOverlap: false,
						hoverAnimation: false,
						data: [{
								value: this.data1.value,
								name: this.data1.name,
								itemStyle: {
									color: '#57a0ff',
								}
							},
							{
								value: this.data2.value,
								name: this.data2.name,
								itemStyle: {
									color: '#72c05a'
								}
							},
							{
								value: this.data3.value,
								name: this.data3.name,
								itemStyle: {
									color: '#f2cb13'
								}
							},

						]
					}]
				})
			}
		}
	}
</script>