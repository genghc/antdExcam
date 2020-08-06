/*eslint-disable*/
import 'babel-polyfill'//es6转es5兼容ie
import 'url-search-params-polyfill';//让ie支持URLSearchParams
import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/common/common.css';
import Router from './router';
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducers from './store/reducers';
import thunk from 'redux-thunk';//导入redux-thunk
import * as serviceWorker from './serviceWorker';
import "./assets/js/conf/global.js";

let store=createStore(reducers,applyMiddleware(thunk));

//将路由放到无状态组件里为了后面扩展redux
function App(){
    return (
        <React.Fragment>
            <Provider store={store}>
                <Router></Router>
            </Provider>
        </React.Fragment>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
