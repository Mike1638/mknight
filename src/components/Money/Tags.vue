<template>
  <div class="tags">
    <div class="new">
      <button @click="createTag">新增标签</button>
    </div>
    <ul class="current">
      <li @click="toggle(item)"     v-for="(item, index) in datasourse" :key="index" :class=" selectedTags.indexOf(item) >=0 && 'selected'  ">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component,Prop} from "vue-property-decorator";
@Component({})
export default class Tags extends Vue {
  datasourse=this.$store.state.tagList;
  @Prop() selectedTags ?:string[];
  createTag() {
    const tag =  window.prompt('请输入标签名')
   if(tag === null || tag.trim() === ''){
     window.alert('输入为空')
   }else{
     this.$store.commit('createTag',tag)
   }
  }
  toggle(item:string){
      this.$emit('update:selectedTags',item)
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
  background: white;
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