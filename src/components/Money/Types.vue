<template>
  <div>
    <ul class="types">
      <li :class="type === '-' && 'selected'" @click="selectType('-')">支出</li>
      <li :class="type === '+' && 'selected'" @click="selectType('+')">收入</li>
    </ul>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component,Prop} from "vue-property-decorator";
@Component({})
export default class Types extends Vue {
  @Prop() type!: '-';

  selectType(types:string){
      this.$emit('update:type',types)
  }
 
  
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