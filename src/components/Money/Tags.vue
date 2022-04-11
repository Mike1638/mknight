<template>
  <div class="tags">
    <div class="new">
      <button @click="createTag">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="(item, index) in datasourse" :key="index" @click="toggle(item)"  :class=" selectedTags.indexOf(item) >=0 && 'selected'  ">{{ item }}</li>
    </ul>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component({})
export default class Tags extends Vue {
  @Prop(Array) datasourse?: string[];
  selectedTags ?:string[]=[];
  createTag() {
    const tag =  window.prompt('请输入标签名')
    console.log(tag);
    console.log(this.datasourse);
    
    if(tag === null || tag.trim() === ''){
      window.alert('输入为空，请输入标签')
    }else{
     if(this.datasourse){
       if(this.datasourse.indexOf(tag)>=0){window.alert('输入标签重复'); return}
        this.$emit('update:datasourse',[...this.datasourse,tag])
     }
    }
  }
  toggle(item:string){
    const index = this.selectedTags?.indexOf(item)
      if(index === -1){
        this.selectedTags?.push(item)
      }else if(index as number>=0){
         this.selectedTags?.splice(index!,1)   
      }
      this.$emit('update:selected',this.selectedTags)
  }
}
</script>
<style lang='scss' scoped>
.tags {
  flex-grow: 1;
  font-size: 14px;
  padding: 16px;
  display: flex;
  flex-direction: column-reverse;
  > .current {
    display: flex;
    flex-wrap: wrap;
    > li {
      background-color: #d9d9d9;
      height: 24px;
      border-radius: 12px;
      padding: 0px 15px;
      margin-right: 12px;
      margin-top: 4px;
      &.selected{
        background-color: rgb(116, 116, 116);
      }
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
</style>