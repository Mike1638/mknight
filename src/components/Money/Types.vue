<template>
        <div>
        <ul class="types">
          <li class="selected">支出</li>
          <li>收入</li>
        </ul>
      </div>

</template>

<script lang='ts'>
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
@Component({})
export default class Types extends Vue {
}
</script>
<style lang='scss' scoped>
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
</style>