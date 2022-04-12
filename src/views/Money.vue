<template>
  <div>
    <Layout class-prefix="layout">
      {{ record }}
      <NumberPad :value.sync="record.amount" @saveRecord="saveRecord" />
      <Types :type.sync="record.type" />
       <div class="notes">
      <FormItem @update:value="onUpdateNotes" filedName="备注"  placeholderName="请输入备注"/>
       </div>
      <Tags
        :datasourse="tag"
        @update:datasourse="tag = $event"
        @update:selected="onUpdateTags"
      />
    </Layout>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component,Watch } from "vue-property-decorator";
import Tags from "@/components/Money/Tags.vue";
import Types from "@/components/Money/Types.vue";
import FormItem from "@/components/Money/FormItem.vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import recordListModel from "@/models/model"
import tagListModel from "@/models/tagListModel"

type RecordItem = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  createAt?:Date | undefined;
};
type RecordList = RecordItem[];
@Component({
  components: { Tags, Types, FormItem, NumberPad },
})
export default class Money extends Vue {
  recordList: RecordList = recordListModel.fetch();
  record: RecordItem = { tags: [], type: "-", amount: 0, notes: "" ,createAt:undefined};
  tag = tagListModel.fetch();
  onUpdateTags(value: string[]) {
    this.record.tags = value;
  }
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }
  saveRecord() {
    const  record2 :RecordItem = recordListModel.clone(this.recordList)
    record2.createAt = new Date();
    this.recordList.push(record2);
    console.log(JSON.stringify(this.recordList));
  }
  @Watch('recordList')
    onRecordListChange(){
     recordListModel.save(this.recordList)
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