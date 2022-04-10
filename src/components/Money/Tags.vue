<template>
   <div class="tags">
        <div class="new">
          <button>新增标签</button>
        </div>
        <ul class="current">
          <li>衣</li>
          <li>衣</li>
          <li>衣</li>
          <li>衣</li>
        </ul>
      </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
@Component({})
export default class Tags extends Vue {
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
      margin-top:4px;
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