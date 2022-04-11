const listname = "tagList";
type TagListModel = {
  data:string[],
  fetch:()=>string[],
  save:()=>void,
  create :(data:string)=>'success' | 'duplicated'
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
    if(this.data.indexOf(data)>=0){return 'duplicated'}
       this.data.push(data);
       this.save()
       return 'success'
  }
};

export default tagListModel;
