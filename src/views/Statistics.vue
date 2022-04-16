<template>
  <div>
    <Layout>
      <Tabs :datasourse="datasourse" :type.sync="type" classPrefix="type" />
      <Tabs :datasourse="dayList" :type.sync="daytype" classPrefix="day" />
      <div>
        <ol v-if='result.length>0'>
          <li v-for="(group, index) in result" :key="index">
            <h3 class="title">{{ beautify(group.title) }} <span>￥{{group.total}}</span></h3>
            <ol>
              <li v-for="item in group.items" :key="item.id" class="record">
                <span> {{ showtags(item.tags) }}</span>
                <span class="note">{{ item.notes }}</span>
                <span>￥{{ item.amount }}</span>
              </li>
            </ol>
          </li>
        </ol>
        <div v-else>
          暂无数据展示
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
</style>

<script lang='ts'>
import Vue from "vue";
import Types from "@/components/Money/Types.vue";
import Tabs from "@/components/Tabs.vue";
import dayjs from 'dayjs'
import { Component } from "vue-property-decorator";
import clone from "@/lib/clone";
type RecordItem = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  createAt: string;
};
type Tag = { id: string; name: string };
@Component({
  components: { Types, Tabs },
})
export default class Statistics extends Vue {
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
  daytype = "day";
  datasourse = [
    { name: "支出", value: "-" },
    { name: "收入", value: "+" },
  ];
  dayList = [
    { name: "日", value: "day" },
    { name: "月", value: "month" },
    { name: "年", value: "year" },
  ];
}
</script>

<style lang='scss' scoped>
::v-deep .type-tabs-item {
  background: white;
  &.selected {
    background: #c4c4c4;
    &::after {
      display: none;
    }
  }
}
::v-deep li.day-tabs-item {
  height: 40px;
}
</style>