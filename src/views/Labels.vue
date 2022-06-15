<template>
  <div>
    <Layout>
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
        </div>
      </div>
      <Echarts :option="option" />
      <div class="buttonwrapper">
        <div class="wbutton" @click="incomechange">收入</div>
        <div class="wbutton" @click="paychange">支出</div>
      </div>
      <!-- <ul class="tags">
        <router-link
          v-for="tag in tags"
          :key="tag.id"
          :to="`/labels/editlabel/${tag.id}`"
          class="link"
        >
          <span>{{ tag.name }}</span>
          <Icon name="right" class="icon" />
        </router-link>
      </ul>
      <div class="button-wrapper">
        <Button @click="createTag">新建标签</Button>
      </div> -->
    </Layout>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Button from "@/components/Button.vue";
import Echarts from "@/components/Money/echarts.vue";
import { mapGetters } from "vuex";
@Component({
  components: { Button, Echarts },
   computed:{
    ...mapGetters(['incomes','pays','remaining'])
  },
})
export default class Labels extends Vue {
 
  //echarts数据
  option :any = {
  tooltip: {
    trigger: 'item'
  },
  series: [
    {
      name: '金额占比',
      type: 'pie',
      radius: ['30%','70%'],
      data:this.$store.getters.incomeitem,
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
                        align: "left"
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
  };
  
  incomechange() {
    console.log('xxx');
    console.log(this.$store.getters.incomeitem);
    
    this.option.series.data = this.$store.getters.incomeitem
    this.option = {...this.option}
  }
  paychange() {
     console.log('yyy');
     console.log(this.$store.getters.payitem)
     this.option.series.data = this.$store.getters.payitem
     this.option = {...this.option}
  }
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
      // 判断预算剩余是否进行提醒
    }
  }

  tags = this.$store.state.tagList;
  createTag() {
    const name = window.prompt("请输入标签名");
    if (name) {
      this.$store.commit("createTag", name);
    }
  }
}
</script>
<style lang='scss' scoped>
.buttonwrapper {
  width: 100vw;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  > .wbutton {
    background: rgb(89, 157, 225);
    border-radius: 15px;
    width: 40%;
    text-align: center;
    line-height: 50px;
    font-size: x-large;
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
.tags {
  background: #fff;
  padding-left: 15px;
  > .link {
    font-size: 16px;
    padding: 9px 15px;
    border-bottom: 1px solid #e6e6e6;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    > .icon {
      width: 20px;
      height: 18px;
    }
  }
}
</style>  