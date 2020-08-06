/*eslint-disable*/
import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom';
import asyncComponent from '../../../components/async/AsyncComponent';
import Css from '../../../assets/css/home/main/index.css';
const IndexPage=asyncComponent(()=>import("../index/index"));
const CartPage=asyncComponent(()=>import("../cart/index"));
const UserCenter=asyncComponent(()=>import("../../user/index"));

export default class MainPage extends React.Component {
    constructor(){
        super();
        this.state={
            homeActive:true,
            cartActive:false,
            myActive:false
        }
    }
    replacePage(url){
        this.props.history.replace(url);
    }
    componentDidMount(){
        this.changeButtonNavStyle(this.props.location.pathname);
    }
    componentWillReceiveProps(props){
        this.changeButtonNavStyle(props.location.pathname);
    }
    changeButtonNavStyle(pathname){
        switch (pathname) {
            case base.config.path+"home/index":
                this.setState({homeActive:true,cartActive:false,myActive:false});
                break;
            case base.config.path+"home/cart":
                this.setState({homeActive:false,cartActive:true,myActive:false});
                break;
            case base.config.path+"home/user":
                this.setState({homeActive:false,cartActive:false,myActive:true});
                break;
            default:
                this.setState({homeActive:true,cartActive:false,myActive:false});
                break;
        }
    }
    componentWillUnmount(){
        this.setState=(state,callback)=>{
            return;
        }
    }
    render() {
        return (
            <div className={Css['page']}>
                <React.Fragment>
                    <Switch>
                        <Route path={base.config.path+"home/index"} component={IndexPage}></Route>
                        <Route path={base.config.path+"home/cart"} component={CartPage}></Route>
                        <Route path={base.config.path+"home/user"} component={UserCenter}></Route>
                        <Redirect to={base.config.path+"home/index"}></Redirect>
                    </Switch>
                </React.Fragment>
                <div className={Css["bottom-nav"]}>
                    <ul className={this.state.homeActive?Css["active"]:""} onClick={this.replacePage.bind(this,base.config.path+'home/index')}>
                        <li className={Css["home"]}></li>
                        <li>首页</li>
                    </ul>
                    <ul className={this.state.cartActive?Css["active"]:""} onClick={this.replacePage.bind(this,base.config.path+'home/cart')}>
                        <li className={Css["cart"]}></li>
                        <li>购物车</li>
                        <li className={Css['spot']+" hide"}></li>
                    </ul>
                    <ul className={this.state.myActive?Css["active"]:""} onClick={this.replacePage.bind(this,base.config.path+'home/user')}>
                        <li className={Css["my"]}></li>
                        <li>我的</li>
                    </ul>
                </div>
            </div>
        )
    }
}
