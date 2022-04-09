<template>
  <div>
    <router-link to="/money"> <Icon name="money" /> 记账</router-link>
    <router-link to="/labels"> <Icon name="label" /> 标签</router-link>
    <router-link to="/statistics"> <Icon name="barchart" /> 统计</router-link>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";
import x from "@/assets/icons/money.svg";
console.log(x);

@Component({})
export default class Nav extends Vue {}
</script>


<style lang='scss' scoped>
</style>