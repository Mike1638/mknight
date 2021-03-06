import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Nav from '@/components/Nav.vue'
import Layout from "@/components/Layout.vue"
import Icon from "@/components/Icon.vue"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.component('Nav', Nav)
Vue.component('Layout', Layout)
Vue.component('Icon',Icon)
Vue.use(ElementUI);




// // record store
// window.recordList = recordListModel.fetch();
// window.createRecord =(record:RecordItem)=>{recordListModel.create(record)}

// // tag store
// window.tagList = tagListModel.fetch()
// window.createTag = (name:string)=>{
//   const message =  tagListModel.create(name)
//   if (message === "success") {
//     window.alert("新增成功");
//   }
//   if (message === "duplicated") {
//     window.alert("标签输入重复");
//   }
// }
// window.removeTag=(tag:Tag)=>{
//   if(tagListModel.remove(tag)){
//     return true
//   }else{
//     return false
//   }
// }
// window.updateTag=(id,name)=>{
//    return  tagListModel.updateTag(id,name)
// }
// window.findTag = (id:string)=>{
//   return window.tagList.filter(t=>t.id === id)[0]
// }




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')