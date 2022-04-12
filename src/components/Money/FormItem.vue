<template>
      <div>
        <label class="formitem">
          <span class="name">{{filedName}}</span>
          <input type="text" :placeholder="placeholderName"  :value="value" @input="onChange"/>
        </label>
      </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'
@Component({})
export default class Notes extends Vue {
  @Prop({default:''})  value! :string
  @Prop(String) filedName?:string
  @Prop(String) placeholderName ?: string
  onChange(event:KeyboardEvent){
    this.$emit('update:value', (event.target as HTMLInputElement).value)
  }
}
</script>
<style lang='scss' scoped>
.formitem {
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
    border: none;
    background: transparent;
    padding-right: 16px;
    padding: 12px 0;
  }
}
</style>