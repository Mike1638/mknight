<template>
  <div>
    {{record}}
    <Layout class-prefix="layout">
      <NumberPad :value.sync="record.amount" @saveRecord="saveRecord" />
      <Types :type.sync="record.type" />
       <div class="notes">
      <FormItem @update:value="onUpdateNotes" :value='record.notes' filedName="备注"  placeholderName="请输入备注"/>
       </div>
      <Tags
           @update:selected="onUpdateTags"
      />
    </Layout>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component} from "vue-property-decorator";
import Tags from "@/components/Money/Tags.vue";
import Types from "@/components/Money/Types.vue";
import FormItem from "@/components/Money/FormItem.vue";
import NumberPad from "@/components/Money/NumberPad.vue";
type RecordItem = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  createAt?:string;
};
type RecordList = RecordItem[];
@Component({
  components: { Tags, Types, FormItem, NumberPad },
})
export default class Money extends Vue {
  recordList: RecordList = this.$store.state.recordList;
  record: RecordItem = { tags: [], type: "-", amount: 0, notes: "" ,createAt:undefined};
  tag = this.$store.state.tagList;
  onUpdateTags(value: string[]) {
    this.record.tags = value;
  }
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }
  saveRecord() {
    if(!this.record || this.record.tags.length === 0){
      return window.alert('请至少选择一个标签！')
    }
    this.$store.commit('createRecord',this.record)
    this.onUpdateNotes('')
    // this.record.tags=[]
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
.notes{
  padding: 12px 0;
}
</style>

<style lang='scss' scoped>
</style>