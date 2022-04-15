<template>
  <div>
    <Layout>
      <Tabs :datasourse="datasourse" :type.sync="type" classPrefix="type" />
      <Tabs :datasourse="dayList" :type.sync="daytype" classPrefix="day" />
      <div>
        <ol>
          <li v-for="(group, index) in result" :key="index">
            <h3 class="title">{{ group.title }}</h3>
            <ol>
              <li v-for="item in group.items" :key="item.id" class="record">
                <span> {{ showtags(item.tags) }}</span>
                <span class="note">{{ item.notes }}</span>
                <span>￥{{ item.amount }}</span>
              </li>
            </ol>
          </li>
        </ol>
      </div>
    </Layout>
  </div>
</template>

<style lang="scss" scoped>
%item {
  padding: 8px 16px;
  min-height: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title {
  @extend %item;
}
.record {
  @extend %item;
  background-color: white;
}
.note {
  margin-right: auto;
  margin-left: 8px;
}
</style>

<script lang='ts'>
import Vue from "vue";
import Types from "@/components/Money/Types.vue";
import Tabs from "@/components/Tabs.vue";
import { Component } from "vue-property-decorator";
type RecordItem = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  createAt: string;
};
type Items = RecordItem[];
type HashTableValue = { title: string; items: Items };
type Tag = { id: string; name: string };
@Component({
  components: { Types, Tabs },
})
export default class Statistics extends Vue {
  showtags(tag: Tag[]) {
    if (tag.length) {
      let put = [];
      for (let i = 0; i < tag.length; i++) {
        put.push(tag[i].name);
      }
      return put.toString();
    } else {
      return "无";
    }
    //   tags.length === 0? '无' : tags[0].name;
  }
  get recordList() {
    return this.$store.state.recordList as RecordItem[];
  }
  get result() {
    const { recordList } = this;
    const hashTable: { [key: string]: HashTableValue } = {};
    for (let i = 0; i < recordList.length; i++) {
      const [day, time] = recordList[i].createAt.split("T");
      hashTable[day] = hashTable[day] || { title: day, items: [] };
      hashTable[day].items.push(recordList[i]);
    }
    return hashTable;
  }
  type = "-";
  daytype = "day";
  datasourse = [
    { name: "支出", value: "-" },
    { name: "收入", value: "+" },
  ];
  dayList = [
    { name: "日", value: "day" },
    { name: "月", value: "month" },
    { name: "年", value: "year" },
  ];
}
</script>

<style lang='scss' scoped>
::v-deep .type-tabs-item {
  background: white;
  &.selected {
    background: #c4c4c4;
    &::after {
      display: none;
    }
  }
}
::v-deep li.day-tabs-item {
  height: 40px;
}
</style>