<template>
  <div>
    <Layout class-prefix="layout">
      <NumberPad :value.sync="record.amount" @saveRecord="saveRecord" />
      <Types :type.sync="record.type" />
       <div class="notes">
      <div class="block">
        <span class="demonstration">日期</span>
        <el-date-picker
        v-model="record.createAt"
        align="right"
        type="date"
        size="small"
        placeholder="选择日期"
        value-format ="yyyy-MM-dd"
        @focus = 'forbid'
        :picker-options="pickerOptions">
        </el-date-picker>
      </div>
      <FormItem @update:value="onUpdateNotes" :value='record.notes' filedName="备注"  placeholderName="请输入备注"/>
       </div>
      <Tags
           @update:selectedTags="onUpdateTags"
           :selectedTags='record.tags'
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



@Component({
  components: { Tags, Types, FormItem, NumberPad },
})
export default class Money extends Vue {
   pickerOptions:any = {
          shortcuts: [
            {
            text: '今天',
            onClick(picker :any) {
              console.log(picker)
              picker.$emit('pick', new Date());
            }
          }, 
          {
            text: '昨天',
            onClick(picker :any) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          },
           {
            text: '前天',
            onClick(picker :any) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 2);
              picker.$emit('pick', date);
            }
          },  
          {
            text: '一周前',
            onClick(picker :any) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }
          ],
          disabledDate(time:any) {
            return time.getTime() > Date.now() - 8.64e6; //只能选择今天及今天之前的日期
            // return time.getTime() > Date.now() - 8.64e7; //只能选择今天之前的日期，连今天的日期也不能选
          }
        }
   forbid(){
    if(document.activeElement instanceof HTMLElement){
      document.activeElement.blur()
    }
    this.$nextTick(() => {
      let inputTime = document.querySelectorAll('.el-input__inner')
      inputTime.forEach(item => {
        item.addEventListener('focus', () => {
          if(document.activeElement instanceof HTMLElement){
              document.activeElement.blur()
           }
        })
      })
    })
   }
  // datevalue :any =  ''
  
  recordList: RecordList = this.$store.state.recordList;
  record: RecordItem = { tags: [], type: "-", amount: 0, notes: "" ,createAt:''};
  tag = this.$store.state.tagList;
  onUpdateTags(value: Tag) { // value :string   选择标签
   const a = this.record.tags?.[0]?.id
   if(a === undefined){
    this.record.tags.push(value)
   }else if(a === value.id){
      this.record.tags = []
   }
  }
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }
  saveRecord() {
    if(!this.record || this.record.tags.length === 0){
      return window.alert('请选择一个标签！')
    }
    this.$store.commit('createRecord',this.record)
    this.onUpdateNotes('')
    this.record.tags=[]
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
.notes{
  padding-top: 5px;
}

.el-picker-panel.el-date-picker.el-popper.has-sidebar{
  width: 100vw;
  .el-picker-panel__sidebar{
    width:80px;
  }
  .el-picker-panel__body{
    .el-date-picker__header {
      margin-left: -30px;
    }
    .el-picker-panel__content{
      margin-left: -30px;
    }
   }
} 
.el-date-picker {
  border: 1px solid yellow;

}
.el-popper {
  border: 1px solid green;
}
.has-sidebar{
  border: 1px solid blue;

}
// .el-date-picker.has-sidebar{
//   width: 100vw;
//   > .el-picker-panel__body{
//      margin-left: 60px;
//   }
// }
</style>

<style lang='scss' scoped>
.demonstration{
  font-size: 14px;
  padding-left: 16px;
  margin-right: 16px;
}

</style>