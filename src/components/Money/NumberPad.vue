<template>
  <div class="numberPad">
    <div class="output">{{ output }}</div>
    <div class="buttons" @click="inputContent">
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button @click.stop="remove">删除</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button @click.stop="empty">清空</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button class="ok" @click.stop="ok">ok</button>
      <button class="zero">0</button>
      <button>.</button>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component({})
export default class NumberPad extends Vue {
   @Prop(Number) value!:string;
   output = this.value.toString() ||  '0'
  inputContent(event: MouseEvent) {
    const button = event.target as HTMLButtonElement;
    if (this.output.length === 16) {
      return;
    }
    if (this.output === "0") {
      if ("0123456789".indexOf(button.textContent as string) >= 0) {
        this.output = button.textContent as string;
      }
      return;
    } else if (this.output.indexOf(".") >= 0) {
      if (button.textContent === ".") {
        return;
      }
    }
    this.output += button.textContent;
  }
  remove(){
    if(this.output.length>1){
    this.output = this.output.slice(0,this.output.length-1)
    }else{
      this.output = '0'
    }
    
  }
  empty() {
    this.output = '0'
  }
  ok(){
    console.log('ok');
    
    this.$emit('update:value',parseInt(this.output))
    this.$emit('saveRecord')
    this.output = '0'
  }
}
</script>
<style lang='scss' scoped>
@import "~@/assets/styles/helper.scss";
.numberPad {
  > .output {
    font-size: 36px;
    font-family: "Consolas", monospace;
    padding: 8px 16px;
    text-align: right;
    box-shadow: inset 0 -5px 5px -5px fade-out($color: #000000, $amount: 0.5),
      inset 0 5px 5px -5px fade-out($color: #000000, $amount: 0.5);
  }
  > .buttons {
    @extend %clearfix;
    > button {
      float: left;
      width: 25%;
      height: 64px;
      border: none;
      background: transparent;
      &.ok {
        height: 64px * 2;
        float: right;
      }
      &.zero {
        width: 50%;
      }
      $bg: #f2f2f2;
      &:nth-child(1) {
        background: $bg;
      }
      &:nth-child(2),
      &:nth-child(5) {
        background: darken($color: $bg, $amount: 4%);
      }
      &:nth-child(3),
      &:nth-child(6),
      &:nth-child(9) {
        background: darken($color: $bg, $amount: 4% * 2);
      }
      &:nth-child(4),
      &:nth-child(7),
      &:nth-child(10) {
        background: darken($color: $bg, $amount: 4% * 3);
      }
      &:nth-child(8),
      &:nth-child(11),
      &:nth-child(13) {
        background: darken($color: $bg, $amount: 4% * 4);
      }
      &:nth-child(12) {
        background: darken($color: $bg, $amount: 4% * 6);
      }
      &:nth-child(14) {
        background: darken($color: $bg, $amount: 4% * 5);
      }
    }
  }
}
</style>