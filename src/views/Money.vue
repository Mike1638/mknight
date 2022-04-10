<template>
  <div>
    <Layout class-prefix="layout">
      <NumberPad />
      <Types :type.sync=type />
      <Notes />
      <Tags />
    </Layout>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tags from "@/components/Money/Tags.vue";
import Types from "@/components/Money/Types.vue";
import Notes from "@/components/Money/Notes.vue";
import NumberPad from "@/components/Money/NumberPad.vue";
@Component({
  components: { Tags, Types, Notes, NumberPad },
})
export default class Money extends Vue {
  type = '-'
}
</script>

<style lang="scss">
.layout-content {
  border: 1px solid rgb(0, 255, 76);
  display: flex;
  flex-direction: column-reverse;
}
</style>

<style lang='scss' scoped>
@import "~@/assets/styles/helper.scss";
.tags {
  flex-grow: 1;
  font-size: 14px;
  padding: 16px;
  display: flex;
  flex-direction: column-reverse;
  > .current {
    display: flex;
    border: 1px solid red;
    flex-wrap: wrap;
    > li {
      background-color: #d9d9d9;
      height: 24px;
      border-radius: 12px;
      padding: 0px 15px;
      margin-right: 12px;
      margin-top: 4px;
    }
  }
  > .new {
    padding-top: 16px;
    button {
      border: none;
      color: #999;
      font-size: 14px;
      border-bottom: 1px solid;
      background: transparent;
      padding: 0px 4px;
    }
  }
}
.notes {
  background: #f5f5f5;
  font-size: 14px;
  display: block;
  padding-left: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  > .name {
    margin-right: 16px;
  }
  input {
    flex-grow: 1;
    height: 64px;
    border: none;
    background: transparent;
    padding-right: 16px;
  }
}
.types {
  background-color: #c4c4c4;
  display: flex;
  text-align: center;
  font-size: 24px;
  > li {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 64px;
    width: 50%;
    position: relative;
    &.selected::after {
      content: "";
      position: absolute;
      left: 0px;
      bottom: 0px;
      width: 100%;
      height: 4px;
      background: #333;
    }
  }
}
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