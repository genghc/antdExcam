import {combineReducers} from "redux";
import counterReducer from './counter';
import userReducer from './user';
import searchReducer from './search';

let reducers=combineReducers({
    counter:counterReducer,
    user:userReducer,
    search:searchReducer
});
export default reducers;
