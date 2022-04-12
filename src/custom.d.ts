type RecordItem = {
    tags: string[];
    notes: string;
    type: string;
    amount: number;
    createAt?:Date | undefined;
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

interface Window{
   tagList:Tag[],
   createTag:(name:string)=>void,
   removeTag:(tag:Tag)=>boolean,
   updateTag:(id:string,name:string)=> "Not Found"|"success"|"duplicated";
   findTag:(id:string)=>Tag |undefined

   recordList:RecordItem[]
   createRecord:(record:RecordItem)=>void
}