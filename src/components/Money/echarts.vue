<template>
  <div ref="container" class="wrapper"></div>
</template>

<script lang='ts'>
import Vue from 'vue'
import {Component,Prop,Watch} from 'vue-property-decorator'
import * as echarts from "echarts"
@Component({})

export default class Echarts extends Vue {
    @Prop({required:true}) option!:echarts.EChartsOption
    chart?:echarts.ECharts
    mounted(){
      const element = (this.$refs.container as HTMLDivElement)
      const width = document.documentElement.clientWidth - 2
      element.style.width = `${width}px`
      element.style.height = `${width - 50}px`
      this.chart = echarts.init(element)
      this.chart.setOption(this.option)
    }
   @Watch('option',{deep:true})
   onOptionChange(newvalue:echarts.EChartsOption){
    console.log('1111')
    console.log(newvalue)
    this.chart!.setOption(newvalue)
   }
      
}
</script>
<style lang='scss' scoped>
</style>