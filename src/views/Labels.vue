<template>
  <div>
    <Layout>
      <ul class="tags">
        <router-link
          v-for="tag in tags"
          :key="tag.id"
          :to="`/labels/editlabel/${tag.id}`"
          class="link"
        >
          <span>{{ tag.name }}</span>
          <Icon name="right" class="icon" />
        </router-link>
      </ul>
      <div class="button-wrapper">
        <Button @click="createTag">新建标签</Button>
      </div>
    </Layout>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Button from "@/components/Button.vue";

@Component({
  components: { Button },
})
export default class Labels extends Vue {
  tags =  this.$store.state.tagList;
  createTag() {
    const name = window.prompt("请输入标签名");
    if (name) {
      this.$store.commit('createTag',name);
    }
  }
 
}
</script>
<style lang='scss' scoped>
.tags {
  background: #fff;
  padding-left: 15px;
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