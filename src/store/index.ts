import clone from "@/lib/clone";
import Vue from "vue";
import Vuex from "vuex";
import createId from "@/lib/createId";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    recordList:[] as  RecordItem[] ,
    tagList: [] as Tag[],
    currentTag:{} as Tag
  },
  mutations:{
    createRecord (state,record: RecordItem){
      const record2: RecordItem = clone(record);
      record2.createAt = new Date();
      state.recordList && state.recordList.push(record2);
      store.commit('saveRecords');
    },
    saveRecords(state) {
      localStorage.setItem( "recordList", JSON.stringify(state.recordList));
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
    findTag(state,id: string) {
      state.currentTag =  state.tagList.filter((t: { id: string }) => t.id === id)[0] as Tag;
    },
  
    fetch(state) {
      state.tagList = JSON.parse(window.localStorage.getItem("tagList") || "[]");
    },
  
    createTag(state,name: string) {
      const names = state.tagList.map((tag) => tag.name);
      const id = createId().toString();
      if (names.indexOf(name) >= 0) {
        window.alert("标签输入重复");
        return "duplicated";
      }
      state.tagList.push({ id: id, name: name });
       store.commit('saveTags')
      window.alert("新增成功");
      return "success";
    },
  
    removeTag(state,tag: Tag) {
      const idList = state.tagList.map((t) => t.id);
      const index = idList.indexOf(tag.id);
      console.log(idList, index);
      if (index >= 0) {
        state.tagList.splice(index, 1);
        store.commit('saveTags')
        return true;
      } else {
        return false;
      }
    },
  
    updateTag(state,payload:{id:string,name:string}) {
      const idList = state.tagList.map((t) => t.id);
      const nameList = state.tagList.map((t) => t.name);
      if (idList.indexOf(payload.id) >=0) {
        if (nameList.indexOf(payload.name) >= 0) {
         window.alert("duplicated");
        }
       const tag= state.tagList.filter((t) => t.id === payload.id)[0];
       tag.name = payload.name;
        store.commit('saveTags');
        // window.alert("success") ;
      } else {
        window.alert("Not Found");
      }
    },

  }
});

store.commit('fetchRecords')
store.commit('fetch')
export default store
