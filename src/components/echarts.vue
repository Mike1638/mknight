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
    @Prop(Number) beishu? :number
    chart?:echarts.ECharts
    mounted(){
      const element = (this.$refs.container as HTMLDivElement)
      const width = document.documentElement.clientWidth - 2
      element.style.width = `${width * (this.beishu || 1 ) }px`
      element.style.height = `${width - 50}px`
      this.chart = echarts.init(element)
      this.chart.setOption(this.option) 
    }
   @Watch('option',{deep:true})
   onOptionChange(newvalue:echarts.EChartsOption){
    this.chart!.setOption(newvalue)
   }
      
}
</script>
<style lang='scss' scoped>
</style>