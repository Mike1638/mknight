<template>
  <div>
    <Layout>
      <ul class="tags">
        <li  v-for="(tag,index) in tags" :key="index"><span>{{tag}}</span> <Icon name="right" class="icon" /></li>
      </ul>
      <div class="button">
        <button @click="createTag">新建标签</button>
      </div>
    </Layout>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";
import tagListModel from "@/models/tagListModel"

@Component({})
export default class Labels extends Vue {
  tags = tagListModel.data
  createTag(){
    const name =   window.prompt('请输入标签名')
   if(name){
       const message = tagListModel.create(name)
       if(message === 'success'){ window.alert('新增成功')}
       if(message === 'duplicated'){ window.alert('标签输入重复')}
   }
  }
  beforeCreate(){
    tagListModel.fetch()
  }
}
</script>
<style lang='scss' scoped>
.tags {
  background: #fff;
  padding-left: 15px;
  > li {
    font-size: 16px;
    padding: 9px 15px;
    border-bottom: 1px solid #e6e6e6;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    > .icon{
      width: 20px;
      height: 18px;
    }
  }
}
.button {
  padding-top: 44px;
  text-align: center;
  > button {
    border: none;
    font-size: 17px;
    padding: 9px 16px;
    border-radius: 5px;
    background: #767676;
    color: white;
  }
}
</style>  