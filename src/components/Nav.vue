<template>
  <div class="nav">
    <router-link to="/money" class="item" active-class="selected"> <Icon name="money"  class="icon"/> 记账</router-link>
    <router-link to="/labels" class="item" active-class="selected"> <Icon name="label" /> 标签</router-link>
    <router-link to="/statistics" class="item" active-class="selected"> <Icon name="barchart" /> 统计</router-link>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({})
export default class Nav extends Vue {}
</script>


<style lang='scss' scoped>
.nav{
  display:flex;
  flex-direction: row;
  font-size: 12px;
  box-shadow:0 0 3px rgba(0,0,0,0.4);
  > .item{
     width: 33.33%;
     display: flex;
     justify-content: center;
     flex-direction: column;
     align-items: center;
     padding: 2px 0;
    .icon{
       width: 32px;
       height: 32px;
    }
  }
  >.item.selected{
    color:rgba(199, 123, 24, 0.904);
  }
}
</style>