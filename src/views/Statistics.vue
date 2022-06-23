/* eslint-disable @typescript-eslint/no-unused-vars */
<template>
  <div>
    <Layout>
      <Tabs :datasourse="datasourse" :type.sync="type" classPrefix="type" />
      <div class="echart-wraper" ref="chartwrapper">
      <Echarts :option="option" :beishu="beishu"  />
      </div>
      <div class="listwrapper">
        <ol v-if='result.length>0'>
          <li v-for="(group, index) in result" :key="index">
            <h3 class="title">{{ beautify(group.title) }} <span>￥{{group.total}}</span></h3>
            <ol>
              <li v-for="(item,index) in group.items" :key="index" class="record">
                <span> {{ showtags(item.tags) }}</span>
                <span class="note">{{ item.notes }}</span>
                <span>￥{{ item.amount }}</span>
              </li>
            </ol>
          </li>
        </ol>
        <div v-else class="nodata">
          <div>暂</div>
          <div>无</div>
          <div>数</div>
          <div>据</div>
          <div>展</div>
          <div>示</div>
        </div>
      </div>
    </Layout>
  </div>
</template>

<style lang="scss" scoped>
%item {
  padding: 8px 16px;
  min-height: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title {
  @extend %item;
}
.record {
  @extend %item;
  background-color: white;
}
.note {
  margin-right: auto;
  margin-left: 8px;
}
.listwrapper{
  overflow: scroll;
  height: calc(50vh - 118px);
  .nodata{
    position: fixed;
    left: 50%;
    top: 40%;
    transform: translate(-50%,-50%);
    font-size: 40px;
  }
}
</style>

<script lang='ts'>
import Vue from "vue";
import Types from "@/components/Money/Types.vue";
import Tabs from "@/components/Tabs.vue";
import dayjs from 'dayjs'
import { Component  } from "vue-property-decorator";
import clone from "@/lib/clone";
import Echarts from "@/components/echarts.vue"
import day from 'dayjs'
type Tag = { id: string; name: string };
@Component({
  components: { Types, Tabs ,Echarts},
})
export default class Statistics extends Vue {
  beishu:number = 4.3
  get option(){
    const today = new Date()
    const array = []
    const x =this.recordList.map(item =>{return {creatAt:item.createAt,amount:item.amount}})
    for(let i = 0;i< 29 ;i++){
      const date = day(today).subtract(i,'day').format('YYYY-MM-DD');
      array.push({date:date,value:this.result.find(item =>item.title == date)?.total || 0})
    }
     array.sort((a, b) => {
        if (a.date > b.date) {
          return 1;
        } else if (a.date === b.date) {
          return 0;
        } else {
          return -1;
        }
        })
    const keys = array.map(item => item.date)
    const values = array.map(item => item.value)
    return {
  grid:{
      top:14,
      left:0,
      right:0,
      bottom:20,
    },
  xAxis: {
    type: 'category',
    data: keys,
    axisTick:{alignWithLabel:true},
    axisLabel:{
      formatter:function(value:string,index:number){
        return value.substr(5)
      }
    }
  },
  yAxis: {
    type: 'value',
    show:false
  },  
  tooltip: {
          show: true, triggerOn: 'click',
          position: 'top',
          formatter: '{c}元'
        },
  series: [
    { 
      symbolSize:14,
      itemStyle : {
         normal: {label : {show: true}}
         },
      data: values,
      type: 'line',
   
    }
  ]
    }
  }
 
 mounted(){
  const echartdiv=  (this.$refs.chartwrapper as HTMLDivElement)
     echartdiv.scrollLeft = echartdiv.scrollWidth
 }

  beautify(string:string){
      const d= dayjs()
      const day = dayjs(string)
      if(day.isSame(d,'day')){
         return '今天'      
      }else
      if(day.isSame(d.subtract(1,'day'),'day')){
         return '昨天'
      }else
      if(day.isSame(d.subtract(2,'day'),'day')){
        return '前天'
      }else{
         return day.format('YYYY年MM月D日')
      }
 }
  showtags(tag: Tag[]) {
    return tag.length === 0?'无':  tag.map(item=>item.name).join(',');
  }
  get recordList() {
    return this.$store.state.recordList as RecordItem[];
  }
  get result() {
    console.log(this.type)
      type  HashTable = {title:string,items:RecordItem[],total?:number}[]
    const { recordList } = this;
    let hashTable: HashTable = [];
     const newList = clone(recordList).filter(r=>r.type === this.type).sort((a,b)=>dayjs(b.createAt).valueOf()- dayjs(a.createAt).valueOf()) 
      if(newList.length === 0){ return [] as HashTable}
      const [day1,time1] = newList[0].createAt.split("T")
      hashTable = [{title:day1,items:[newList[0]],total:0}]
      for(let i = 1 ;i<newList.length;i++){
           const [day,time] =  newList[i].createAt.split("T")
           let index = hashTable.length-1
           if(hashTable[index].title === day){
              hashTable[index].items.push(newList[i])
           }else{
              hashTable[index+1] ={title:day,items:[],total:0}
              hashTable[index+1].items.push(newList[i])
           }
      }
      console.log(hashTable);
      hashTable.map(item =>{item.total = item.items.reduce((sum,x)=>sum+x.amount,0)});
   //  for (let i = 0; i < recordList.length; i++) {
   //    const [day, time] = recordList[i].createAt.split("T");
   //    hashTable[day] = hashTable[day] || { title: day, items: [] };
   //    hashTable[day].items.push(recordList[i]);
   //  }
     return hashTable;
  }
  type = "-";
  datasourse = [
    { name: "支出", value: "-" },
    { name: "收入", value: "+" },
  ];
  
}
</script>

<style lang='scss' scoped>
::v-deep .type-tabs-item {
  background: white;
  &.selected {
    background: #80afdd;
    &::after {
      display: none;
    }
  }
}
::v-deep li.day-tabs-item {
  height: 40px;
}
.echart-wraper{
  overflow: scroll;
  &::-webkit-scrollbar{
    display: none;
  }
}
</style>
