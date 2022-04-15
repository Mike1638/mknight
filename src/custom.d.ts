type RecordItem = {
    tags: string[];
    notes: string;
    type: string;
    amount: number;
    createAt:string;
  };
type RecordList = RecordItem[];

type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  save: () => void;
  create: (data: string) => "success" | "duplicated";
  updateTag: (id:string,name: string) => "Not Found"|"success"|"duplicated";
  remove:(value:Tag)=>boolean
};
type Tag = {
  id: string;
  name: string;
};

