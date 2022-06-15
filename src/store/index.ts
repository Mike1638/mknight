import clone from "@/lib/clone";
import Vue from "vue";
import Vuex from "vuex";
import createId from "@/lib/createId";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
    tagList: [] as Tag[],
    currentTag: {} as Tag,
    budget: 0 as number,
    income: 0 as number,
    pay: 0 as number,
    remaining: 0 as number,
    incomeitem: [] as [],
    payitem: [] as [],
  },
  getters: {
    incomes(state) {
      let a = state.recordList;
      var number = 0;
      for (let i = 0; i < a.length; i++) {
        if (a[i].type === "+") {
          number += a[i].amount;
        }
      }
      return number;
    },
    pays(state) {
      let a = state.recordList;
      var number = 0;
      for (let i = 0; i < a.length; i++) {
        if (a[i].type === "-") {
          number += a[i].amount;
        }
      }
      return number;
    },
    remaining(state, getters) {
      let a = state.budget - getters.pays;
      return a;
    },
    incomeitem(state) {
      type Item = {value: number, name: string};
    const arr : Item[]= state.recordList.filter(item=>item.type === '+').map(item=>{return {value:item.amount,name:item.tags[0].name}})
    const map: Record<string, Item> = {};
    const dest:Item[] = []
    for(var i = 0; i < arr.length; i++){
      var ai = arr[i];
      if(!map[ai.name]){
        dest.push({
          name: ai.name,
          value: ai.value
          });
          map[ai.name] = ai;
      }else{
      for(var j = 0; j < dest.length; j++){
        var dj = dest[j];
          if(dj.name == ai.name){
          dj.value=dj.value + ai.value;
          break;
          }
          }
      }
    }
    return dest
    },
    payitem(state) {
    type Item = {value: number, name: string};
    const arr : Item[]= state.recordList.filter(item=>item.type === '-').map(item=>{return {value:item.amount,name:item.tags[0].name}})
    const map: Record<string, Item> = {};
    const dest:Item[] = []
    for(var i = 0; i < arr.length; i++){
      var ai = arr[i];
      if(!map[ai.name]){
        dest.push({
          name: ai.name,
          value: ai.value
          });
          map[ai.name] = ai;
      }else{
      for(var j = 0; j < dest.length; j++){
        var dj = dest[j];
          if(dj.name == ai.name){
          dj.value=dj.value + ai.value;
          break;
          }
          }
      }
    }
    return dest
    } 
    
  },
  mutations: {
    //budget
    saveBudget(state, number) {
      state.budget = number;
      localStorage.setItem("budget", JSON.stringify(state.budget));
    },
    fetchBudget(state) {
      state.budget = parseInt(localStorage.getItem("budget") || "0");
    },

    //Record
    createRecord(state, record: RecordItem) {
      console.log(record)
      const record2: RecordItem = clone(record);
      // record2.createAt = new Date().toISOString();
      state.recordList && state.recordList.push(record2);
      store.commit("saveRecords");
    },
    saveRecords(state) {
      localStorage.setItem("recordList", JSON.stringify(state.recordList));
    },
    fetchRecords(state) {
      state.recordList = JSON.parse(
        window.localStorage.getItem("recordList") || "[]"
      ) as RecordItem[];
    },

    //tag
    saveTags(state) {
      localStorage.setItem("tagList", JSON.stringify(state.tagList));
    },
    findTag(state, id: string) {
      state.currentTag = state.tagList.filter(
        (t: { id: string }) => t.id === id
      )[0] as Tag;
    },

    fetch(state) {
      state.tagList = JSON.parse(
        window.localStorage.getItem("tagList") || "[]"
      );
    },

    createTag(state, name: string) {
      const names = state.tagList.map((tag) => tag.name);
      const id = createId().toString();
      if (names.indexOf(name) >= 0) {
        window.alert("标签输入重复");
        return "duplicated";
      }
      state.tagList.push({ id: id, name: name });
      store.commit("saveTags");
      window.alert("新增成功");
      return "success";
    },

    removeTag(state, tag: Tag) {
      const idList = state.tagList.map((t) => t.id);
      const index = idList.indexOf(tag.id);
      console.log(idList, index);
      if (index >= 0) {
        state.tagList.splice(index, 1);
        store.commit("saveTags");
        return true;
      } else {
        return false;
      }
    },

    updateTag(state, payload: { id: string; name: string }) {
      const idList = state.tagList.map((t) => t.id);
      const nameList = state.tagList.map((t) => t.name);
      if (idList.indexOf(payload.id) >= 0) {
        if (nameList.indexOf(payload.name) >= 0) {
          store.commit("saveTags");
          window.alert("duplicated");
          window.alert("duplicated");
          window.alert("duplicated");
        } else {
          const tag = state.tagList.filter((t) => t.id === payload.id)[0];
          tag.name = payload.name;
          store.commit("saveTags");
          // window.alert("success") ;
        }
      } else {
        window.alert("Not Found");
      }
    },
  },
});

store.commit("fetchRecords");
store.commit("fetch");
export default store;
