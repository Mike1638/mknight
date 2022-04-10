<template>
      <div>
        <label class="notes">
          <span class="name">备注{{value}} </span>
          <input type="text" placeholder="在这里输入备注"  v-model='value'/>
        </label>
      </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
@Component({})
export default class Notes extends Vue {
  value = ''
  // onChange(event:KeyboardEvent){
  //   this.value = (event.target as HTMLInputElement).value;
  // }
}
</script>
<style lang='scss' scoped>
.notes {
  background: #f5f5f5;
  font-size: 14px;
  display: block;
  padding-left: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  > .name {
    margin-right: 16px;
  }
  input {
    flex-grow: 1;
    height: 64px;
    border: none;
    background: transparent;
    padding-right: 16px;
  }
}
</style>