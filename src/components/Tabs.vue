<template>
  <div>
      <ul class="tabs">
          <li v-for="item in datasourse" :key="item.value" @click="toggle(item.value)"   :class="{selected:type === item.value,[classPrefix+'-tabs-item']:classPrefix}">{{item.name}}</li>
      </ul>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'
@Component({})
export default class Tabs extends Vue {
   @Prop({required:true}) readonly datasourse!:{name:string,value:string}[]
   @Prop({required:true}) type!:string
   @Prop(String) classPrefix?:string
   toggle(type:string){
       this.$emit('update:type',type)
   }   
}
</script>
<style lang='scss' scoped>
.tabs {
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