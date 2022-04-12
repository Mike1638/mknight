import clone from "@/lib/clone";
const listname = "recordList";

const recordListModel = {
  data:[] as RecordItem[],
  create(record:RecordItem){
    const  record2 :RecordItem = clone(record)
    record2.createAt = new Date();
    this.data.push(record2);
    this.save()
  },
  fetch() {
    this.data =  JSON.parse(
      window.localStorage.getItem(listname) || "[]"
    ) as RecordItem[];
    return this.data
  },
  save() {
    localStorage.setItem(listname, JSON.stringify(this.data));
  },
  
};

export default recordListModel;
