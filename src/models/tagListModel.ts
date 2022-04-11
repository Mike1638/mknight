const listname = "tagList";
type TagListModel = {
  data:Tag[],
  fetch:()=>Tag[],
  save:()=>void,
  create :(data:string)=>'success' | 'duplicated'
}
type Tag={
  id:string,
  name:string
}
const tagListModel :TagListModel = {
  data:[],
  fetch() {
    this.data =JSON.parse(
      window.localStorage.getItem(listname) || "[]"
    ); 
    return  this.data;
  },
  save() {
    localStorage.setItem(listname, JSON.stringify(this.data));
  },
  create(data:string){
    const names =tagListModel.data.map(tag=>tag.name)
    if(names.indexOf(data)>=0){return 'duplicated'}
       this.data.push({id:data,name:data});
       this.save()
       return 'success'
  }
};

export default tagListModel;
