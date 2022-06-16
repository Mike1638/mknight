<template>
   <div class="layout-wrapper">
      <div class="content"  :class="classPrefix && `${classPrefix}-content`" >
         <slot/>
        </div>
      <Nav/>
  </div>
  
</template>

<script lang='ts'>
import Vue from 'vue'
import {Component,Prop} from 'vue-property-decorator'
@Component({})
export default class Layout extends Vue {
  @Prop(String) classPrefix?:string
}
</script>
<style lang='scss' scoped>
.layout-wrapper{
     display:flex;
     flex-direction:column;
     height: 100vh;
 }
 .content{
     display: flex;
     flex-direction: column-reverse;
     overflow: auto;
     justify-content: space-between;
     flex-grow:1;
     background:#ecf4f3;
 }
 .edit {
  .content{
    justify-content: flex-end;
  }
 }
</style>