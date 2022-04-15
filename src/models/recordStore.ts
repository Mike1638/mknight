import clone from "@/lib/clone";
const listname = "recordList";


const recordStore = {
  recordList:[] as  RecordItem[] ,
  fetchRecords() {
    this.recordList = JSON.parse(
      window.localStorage.getItem(listname) || "[]"
    ) as RecordItem[];
    return this.recordList;
  },
  saveRecords() {
    localStorage.setItem(listname, JSON.stringify(this.recordList));
  },
  createRecord (record: RecordItem){
    const record2: RecordItem = clone(record);
    record2.createAt = new Date().toString();
    this.recordList && this.recordList.push(record2);
    recordStore.saveRecords();
  },
};

recordStore.fetchRecords();
export default recordStore;
