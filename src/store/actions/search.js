export function addKwords(data){
    return {
        type:"ADD_KWORDS",
        data:data
    }
}
export function delKwords(){
    return {
        type:"DEL_KWORDS",
        data:{aKwords:[]}
    }
}
