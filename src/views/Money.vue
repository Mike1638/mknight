<template>
  <div>
    <Layout class-prefix="layout">
      <NumberPad />
      <Types :type.sync=type />
      <Notes />
      <Tags />
    </Layout>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tags from "@/components/Money/Tags.vue";
import Types from "@/components/Money/Types.vue";
import Notes from "@/components/Money/Notes.vue";
import NumberPad from "@/components/Money/NumberPad.vue";
@Component({
  components: { Tags, Types, Notes, NumberPad },
})
export default class Money extends Vue {
  type = '-'
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>

<style lang='scss' scoped>
</style>