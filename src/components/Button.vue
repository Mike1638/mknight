<template>
  <div class="button">
        <button @click="$emit('click',$event)"><slot/></button>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
@Component({})
export default class Button extends Vue {
}
</script>
<style lang='scss' scoped>
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