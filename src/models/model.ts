const listname = "recordList";
const recordListModel = {
  fetch() {
    return JSON.parse(
      window.localStorage.getItem(listname) || "[]"
    ) as RecordItem[];
  },
  save(data: RecordItem[]) {
    localStorage.setItem(listname, JSON.stringify(data));
  },
  clone(data: RecordItem[] | RecordItem) {
    return  JSON.parse(JSON.stringify(data));
  },
};

export default recordListModel;
