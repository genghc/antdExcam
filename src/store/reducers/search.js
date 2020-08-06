let defaultState={
    aKwords:localStorage['aKwords']?JSON.parse(localStorage['aKwords']):[]
}
function reducer(state=defaultState,action){
    switch (action.type) {
        case "ADD_KWORDS":
            localStorage['aKwords']=JSON.stringify(action.data.aKwords);
            return Object.assign({},state,action.data);
        case "DEL_KWORDS":
            localStorage.removeItem("aKwords");
            return Object.assign({},state,action.data);
        default:
            return state;
    }
}
export default reducer
