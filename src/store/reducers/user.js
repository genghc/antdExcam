//会员
let userState={
    username:localStorage['username']?localStorage['username']:"",
    isLogin:localStorage['isLogin']?Boolean(localStorage['isLogin']):false
};
function userReducer(state=userState,action){
    switch(action.type){
        case "LOGIN":
            localStorage['username']=action.data.username;
            localStorage['isLogin']=action.data.isLogin;
            return Object.assign({},state,action.data);
        case "OUTLOGIN":
            localStorage.removeItem("username");
            localStorage.removeItem("isLogin");
            return Object.assign({},state,action.data);
        default:
            return state;
    }

}
export default userReducer
