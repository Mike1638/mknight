<template>
  <div>
    <Layout>
      <Tabs :datasourse="datasourse" :type.sync="type" classPrefix="type" />
      <Echarts :option="option" />
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
              <div @click="getbudget">月度预算</div>
              <span @click="getbudget">￥{{ $store.state.budget }}</span>
            </div>
          </div>
          <router-link to="/statistics" class="fenxi"
            >查看月度统计分析</router-link
          >
          <div class="月光"></div>
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
.money {
  background: linear-gradient(
    90deg,
    rgba(207, 199, 210, 1) 0%,
    rgba(152, 185, 218, 1) 42%,
    rgba(76, 151, 226, 1) 100%
  );
  border-radius: 20px;
  > .moneywrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
  }
}

</style>  