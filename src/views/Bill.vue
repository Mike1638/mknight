<template>
  <div>
    <Layout>
      <Tabs :datasourse="datasourse" :type.sync="type" classPrefix="type" />
      <Echarts :option="option" v-if="result.length !== 0" />
      <div class="nodata" v-else>
          <div>暂</div>
          <div>无</div>
          <div>数</div>
          <div>据</div>
          <div>展</div>
          <div>示</div>
      </div>
      <div class="money">
        <div class="moneywrapper">
          <span>当月账单</span>
          <div class="wrapper">
            <div class="pay z">
              <div>月度支出</div>
              <span>￥{{pays}}</span>
            </div>
            <div class="income z">
              <div>月度收入</div>
              <span>￥{{incomes}}</span>
            </div>
            <div class="jieyu z">
              <div>预算剩余</div>
              <span>￥{{remaining}}</span>
            </div>
            <div class="yusuan z">
              <div>月度预算</div>
              <span>￥{{ $store.state.budget }}</span>
            </div>
          </div>
          <div class="月光">
             <div v-if="$store.state.budget == '0'"  @click="getbudget">设置月度预算</div>
             <div v-if="$store.state.budget != '0' && !isfillshow" class="mkfill"  @click="getbudget" :style="{ width: `${mkratio}` }">{{mkratio}}</div>
             <div v-if="isfillshow" class="mkfill"  @click="getbudget">月光啦</div>
          </div>
          <router-link to="/statistics" class="fenxi"
            >查看月度统计分析</router-link
          >
        </div>
      </div>
    </Layout>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Button from "@/components/Button.vue";
import Echarts from "@/components/echarts.vue";
import Tabs from "@/components/Tabs.vue"
@Component({
  components: { Button, Echarts ,Tabs },
})
export default class Labels extends Vue {
 
  datasourse = [
    { name: "支出", value: "-" },
    { name: "收入", value: "+" },
  ];
   type = "-";
  //echarts数据
  get incomes(){
    return this.$store.getters.incomes
  }
  get pays(){
    return this.$store.getters.pays
  }
  get remaining(){
    return this.$store.getters.remaining
  }
  get mkratio(){
       let a = 0
       if(this.$store.state.budget == 0){return 0}
       if(this.$store.getters.pays>=this.$store.state.budget){
         a = 100
       }else{
         a = +((this.$store.getters.pays/this.$store.state.budget)*100).toFixed(1)
       }
      //  let b = `width:${a}%`
      console.log(typeof a);
      
    return a+"%"
  }
  get isfillshow(){
    let a 
    if(this.mkratio != 0){
       a = Number(this.mkratio.substring(0,this.mkratio.length-1))
    }else{
      return false
    }
    if(a>=100){
      return true
    }else{
      return false  
    }
  }
  get option(){
      return {
     tooltip: {
    trigger: 'item'
  },
  series: [
    {
      name: '金额占比',
      type: 'pie',
      radius: ['30%','70%'],
      top:25,
        labelLine: {
                normal: {
                    show: true,//控制线条显示
                    length: 20,
                    length2: 20,
                    lineStyle: {
                        color: '#333'
                    }
                }
 
            },
      data:this.result,
      avoidLabelOverlap:true,
      label: {
            normal: {
                show: true,
                position: 'outer',
                // formatter: '{d}%, {c} \n\n',
                //模板变量有 {a}, {b}，{c}，{d}，{e}，分别表示系列名，数据名，数据值等。
                formatter: "{a_set|{b}\n{d}%}\n\n\n{c_set|{c}元}\n\n",
                borderWidth: 20,
                borderRadius: 4,
                padding: [90, -50],
                rich: {
                    a_set: {
                        color: "#1a1a1a",
                        lineHeight: 20,
                        align: "center"
                    },
                    c_set:{
                        color: "#333338",
                    }
                   
                },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
            },
    }
    }
  ]
      }
  }
  get result(){
    let optiondata
       if(this.type === '-'){
          optiondata =this.$store.getters.payitem
       }else if(this.type === '+'){
           optiondata =this.$store.getters.incomeitem
       }
    return  optiondata
  }
  // incomechange() {
  //   this.option.series[0].data = this.$store.getters.incomeitem
  //   this.option = {...this.option}
  // }
  // paychange() {
    
  //    this.option.series[0].data = this.$store.getters.payitem
  //    this.option = {...this.option}
  // }


  getbudget() {
    let money = parseInt(prompt() || "0");
    if (money > 0) {
      this.$store.commit("saveBudget", money);
      if (money >= 10000) {
        confirm("好有钱啊");
      }
    } else {
      alert("请填写预算且预算不能为负数");
    }
  }

  created() {
    this.$store.commit("fetchBudget");
    if (this.$store.getters.remaining) {
      
    }
  }
  
 
}
</script>
<style lang='scss' scoped>
// v-deep 账单支出收入
::v-deep .type-tabs-item {
  background: white;
  &.selected {
    background: #80afdd;
    &::after {
      display: none;
    }
  }
}

.nodata{
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 28px;
}
.money {
  background: linear-gradient(
    90deg,
    rgba(207, 199, 210, 1) 0%,
    rgba(152, 185, 218, 1) 42%,
    rgba(76, 151, 226, 1) 100%
  );
  border-bottom-left-radius:20px;
  border-bottom-right-radius:20px;
  > .moneywrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    > span {
      padding: 10px;
      font-size: x-large;
      font-weight: bolder;
    }
    > .wrapper {
      width: 100vw;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      > .z {
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        > div {
          padding-top: 5px;
        }
        > span {
          padding-right: 10px;
          font-size: x-large;
          font-weight: bolder;
        }
      }
    }
    .fenxi {
      padding: 15px;
      color: #3f7c00;
    }
    .月光{
      margin-top:20px;
      margin-bottom:5px;
      height: 30px;
      line-height:30px;
      width: 80%;
      border: 1px solid black;
      border-radius: 10px;
      .mkfill{
        height: 28px;
        border-radius: 9px;
        background: linear-gradient(90deg, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);
      }
    }
  }
}

</style>  