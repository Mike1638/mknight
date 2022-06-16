<template>
  <div>
    <ul class="types">
      <li :class="{selected:type === '-',[classPrefix+'-item']:classPrefix}" @click="selectType('-')">支出</li>
      <li :class="{selected:type === '+',[classPrefix+'-item']:classPrefix}"  @click="selectType('+')">收入</li>
    </ul>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component,Prop} from "vue-property-decorator";
@Component({})
export default class Types extends Vue {
  @Prop({required:true}) type!: '-';
  @Prop(String) classPrefix?:string
  selectType(type:string){
      this.$emit('update:type',type)
  }
 
  
}
</script>
<style lang='scss' scoped>
.types {
  background-color: #a2bbd8;
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
      background: #4e98e1;
      border-radius: 2px;
    }
  }
}
</style>