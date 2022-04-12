<template>
  <Layout>
     <div class="navBar">
         <Icon name = 'left' class="left" />
         <span class="title">编辑标签</span>
         <div class="right"></div>
     </div>
     <div class="formitem">
    <FormItem filedName='标签名' placeholderName="请修改"  />
     </div>
    <Button>删除标签</Button>
  </Layout>
</template>

<script lang='ts'>
import tagListModel from '@/models/tagListModel';
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import FormItem from "@/components/Money/FormItem.vue";
import Button from "@/components/Button.vue"
@Component({
    components:{FormItem,Button}
})
export default class  extends Vue {
    
created(){
 const id = this.$route.params.id;
 tagListModel.fetch()
 const tags = tagListModel.data
 const tag = tags.filter(tag=>tag.id === id)[0]
 if(tag){
   console.log(tag);
 }else{
     this.$router.replace('/404')
 }
}
}
</script>
<style lang='scss' scoped>
.navBar{
  font-size: 16px;
   padding: 16px 24px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   background-color: #fff;
   .left{
     width: 24px;
     height: 24px;
   }
   .right{
     width: 24px;
     height: 24px;
   }
}
.formitem{
  margin-top: 10px;
  background-color: white;
}
</style>