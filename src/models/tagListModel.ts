import createId from "@/lib/createId";

const listname = "tagList";

const tagListModel: TagListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(listname) || "[]");
    return this.data;
  },
  save() {
    localStorage.setItem(listname, JSON.stringify(this.data));
  },
  create(data: string) {
    const names = tagListModel.data.map((tag) => tag.name);
    const id= createId().toString()
    if (names.indexOf(data) >= 0) {
      return "duplicated";
    }
    this.data.push({ id: id, name: data });
    this.save();
    return "success";
  },
  updateTag(id:string,name: string) {
    const  idList = this.data.map(t=>t.id)
    const  nameList = this.data.map(t=>t.name)
    if(idList.indexOf(id)>0){
      if(nameList.indexOf(name)>=0){return "duplicated"}
      const tag = this.data.filter(t=>t.id === id)[0]
      tag.name =name
      this.save();      
      return "success"
    }else{
     return "Not Found";
    }
  },
  remove(value:Tag){
    const idList = this.data.map(t=>t.id)
    const index= idList.indexOf(value.id)
    console.log(idList,index);
    if(index>=0){
        this.data.splice(index,1)
        this.save()
        return true
    }else{
      return false
    }
  }
};

export default tagListModel;
