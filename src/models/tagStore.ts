import createId from "@/lib/createId";
const listname = "tagList";
const tagStore = {
  tagList: [] as Tag[],
  saveTags() {
    localStorage.setItem(listname, JSON.stringify(this.tagList));
  },
  findTag(id: string) {
    return this.tagList.filter((t: { id: string }) => t.id === id)[0];
  },

  fetch() {
    this.tagList = JSON.parse(window.localStorage.getItem(listname) || "[]");
    return this.tagList;
  },

  createTag(name: string) {
    const names = this.tagList.map((tag) => tag.name);
    const id = createId().toString();
    if (names.indexOf(name) >= 0) {
      window.alert("标签输入重复");
      return "duplicated";
    }
    this.tagList.push({ id: id, name: name });
    this.saveTags();
    window.alert("新增成功");
    return "success";
  },

  removeTag(tag: Tag) {
    const idList = this.tagList.map((t) => t.id);
    const index = idList.indexOf(tag.id);
    console.log(idList, index);
    if (index >= 0) {
      this.tagList.splice(index, 1);
      this.saveTags();
      return true;
    } else {
      return false;
    }
  },

  updateTag(id: string, name: string) {
    const idList = this.tagList.map((t) => t.id);
    const nameList = this.tagList.map((t) => t.name);
    if (idList.indexOf(id) > 0) {
      if (nameList.indexOf(name) >= 0) {
        return "duplicated";
      }
      const tag = this.tagList.filter((t) => t.id === id)[0];
      tag.name = name;
      this.saveTags();
      return "success";
    } else {
      return "Not Found";
    }
  },
};

tagStore.fetch()
export default tagStore;
