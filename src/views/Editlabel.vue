<template>
<Layout class="edit">
      <Button @click.native="remove">删除标签</Button>
      <div class="formitem">
    <FormItem filedName='标签名' placeholderName="请修改" :value="tag.name" @update:value="updateTag" />
     </div>
       <div class="navBar">
         <Icon name = 'left' class="left" @click="goback" />
         <span class="title">编辑标签</span>
         <div class="right"></div>
     </div>
</Layout>
</template>

<script lang='ts'>
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import FormItem from "@/components/Money/FormItem.vue";
import Button from "@/components/Button.vue"

type Tag = {id:string,name:string}
@Component({
    components:{FormItem,Button}
})

export default class  extends Vue {
tag!:Tag 
remove(){
  if(this.tag){
  this.$store.commit('removeTag',this.tag); 
  }else{
    window.alert('删除失败')
  }
  this.$router.replace('/money/labels')
}


updateTag(value:string){
  if(value.trim() === ''){
    return
  }
 if(this.tag){
  let  payload = {id:this.tag.id,name:value}
 this.$store.commit('updateTag',payload)
 }
}



created(){
this.$store.commit('findTag',this.$route.params.id)
   
   this.tag = this.$store.state.currentTag
   
  if(!this.tag){
    this.$router.replace('/404')
  }
 
}
goback(){
  this.$router.replace('/money/labels')
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
<style>
.edit > .content {
  justify-content: flex-end;
}
</style>