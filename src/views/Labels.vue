<template>
  <div>Labels
      <Nav/>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import Nav from '@/components/Nav.vue'

@Component({
    components:{Nav}
})
export default class  Labels extends Vue {
}
</script>
<style lang='scss' scoped>
</style>