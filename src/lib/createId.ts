let id:number = parseInt(localStorage.getItem('_idmax') || '0') || 0 ;
function  createId(){
    id++
    localStorage.setItem('_idmax',id.toString())
    return id
}
export default createId