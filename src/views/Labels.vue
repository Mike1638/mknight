<template>
  <div>
     <div class="navBar">
         <Icon name = 'left' class="left" @click="goback" />
         <span class="title">修改标签</span>
         <div class="right"></div>
     </div>

     <ul class="tags">
        <router-link
          v-for="tag in tags"
          :key="tag.id"
          :to="`/money/labels/editlabel/${tag.id}`"
          class="link"
        >
          <span>{{ tag.name }}</span>
          <Icon name="right" class="icon" />
        </router-link>
      </ul>
      <div class="button-wrapper">
        <Button @click="createTag">新建标签</Button>
      </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import Button from "@/components/Button.vue"
@Component({
    components:{Button}
})
export default class Labels extends Vue {
  tags = this.$store.state.tagList;
  createTag() {
    const name = window.prompt("请输入标签名");
    if (name) {
      this.$store.commit("createTag", name);
    }
  }
  goback(){
    this.$router.replace("/money")
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

.tags {
  margin-top: 10px;
  background: #fff;
  padding-left: 15px;
  height: 70vh;
  overflow: scroll;
  > .link {
    font-size: 16px;
    padding: 9px 15px;
    border-bottom: 1px solid #e6e6e6;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    > .icon {
      width: 20px;
      height: 18px;
    }
  }
}
</style>