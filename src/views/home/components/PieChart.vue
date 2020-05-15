<template>
	<div :class="className" :style="{height:height,width:width}"  style="display: inline-block;"/>
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
			data1:{},
			data2:{},
			width: {
				type: String,
				default: '100%'
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
					series: [{
						name: 'WEEKLY WRITE ARTICLES',
						type: 'pie',
						radius: ['75%', '90%'],
						center: ['50%', '50%'],
						avoidLabelOverlap: false,
						hoverAnimation: false,
						label: {
							normal: {
								show: true,
								position: 'center',
								fontSize: 14,
								color: 'black',
								fontWeight: 'normal',
								formatter: ' {b}\n\n{d}%'
							},
							emphasis: {
								show: false,
							}
						},
						data: [{
								value: this.data1.value,
								name: this.data1.name,
								itemStyle: {
									color:this.data1.color,
								},
								label: {
									normal: {
										show: true
									}
								},
							},
							{
								value: this.data2.value,
								name: this.data2.name,
								itemStyle: {
									color:this.data2.color,
								},
								label: {
									normal: {
										show: false
									}
								},
							},

						]
					}]
				})
			}
		}
	}
</script>