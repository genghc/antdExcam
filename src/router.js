/*router.js 页面里的代码
HashRouter:有#号
BrowserRouter:没有#号
Switch:只要匹配到一个地址不往下匹配，相当于for循环里面的break
Link:跳转页面，相当于vue里面的router-link
exact :完全匹配路由
Redirect:路由重定向
*/
/*eslint-disable*/
import React from 'react';
import {BrowserRouter as Router, Route, Switch,Redirect} from 'react-router-dom';
import asyncComponent from './components/async/AsyncComponent';
import {AuthRoute} from './routes/private';
const MainPage=asyncComponent(()=>import('./pages/home/main/index'))
const GoodsPage=asyncComponent(()=>import('./pages/home/goods/index'))
const SearchPage=asyncComponent(()=>import('./pages/home/goods/search'))
const SkipPage=asyncComponent(()=>import('./pages/skip'))
const ListViewPage=asyncComponent(()=>import('./pages/antd/ListView.js'))
const ListViewStickyPage=asyncComponent(()=>import('./pages/antd/ListViewSticky.js'))
const PickerImagePage=asyncComponent(()=>import('./pages/antd/PickerImage.js'))
const PickerViewPage=asyncComponent(()=>import('./pages/antd/PickerView.js'))
const SearchBarPage=asyncComponent(()=>import('./pages/antd/SearchBar.js'))
const MenuPage=asyncComponent(()=>import('./pages/antd/Menu.js'))
const PickerPage=asyncComponent(()=>import('./pages/antd/Picker.js'))
const InputItemPage=asyncComponent(()=>import('./pages/antd/InputItem.js'))
const CarouselPage=asyncComponent(()=>import('./pages/antd/Carousel.js'))
const AccordionPage=asyncComponent(()=>import('./pages/antd/Accordion.js'))
const DatePickerViewPage=asyncComponent(()=>import('./pages/antd/DatePickerView.js'))
const PopupPage=asyncComponent(()=>import('./pages/antd/Popup.js'))
const PopupPage=asyncComponent(()=>import('./pages/antd/Popup.js'))
const PopupPage=asyncComponent(()=>import('./pages/antd/Popup.js'))




class RouterComponent extends React.Component{
  render(){
    return (
        <React.Fragment>
            <Router>
                <React.Fragment>
                    <Switch>
                        <Route path={base.config.path+"home"} component={MainPage}></Route>
                        <Route path={base.config.path+"goods"} component={GoodsPage}></Route>
                        <Route path={base.config.path+"search"} component={SearchPage}></Route>
                        <Route path={base.config.path+"skip"} component={SkipPage}></Route>
                        <Route path={base.config.path+"listview"} component={ListViewPage}></Route>
                        <Route path={base.config.path+"listviewsticky"} component={ListViewStickyPage}></Route>
                        <Route path={base.config.path+"pickerimage"} component={PickerImagePage}></Route>
                        <Route path={base.config.path+"pickerview"} component={PickerViewPage}></Route>
                        <Route path={base.config.path+"searchbar"} component={SearchBarPage}></Route>
                        <Route path={base.config.path+"menu"} component={MenuPage}></Route>
                        <Route path={base.config.path+"picker"} component={PickerPage}></Route>
                        <Route path={base.config.path+"inputitem"} component={InputItemPage}></Route>
                        <Route path={base.config.path+"carousel"} component={CarouselPage}></Route>
                        <Route path={base.config.path+"accordion"} component={AccordionPage}></Route>
                        <Route path={base.config.path+"datepickerview"} component={DatePickerViewPage}></Route>
                        <Route path={base.config.path+"popup"} component={PopupPage}></Route>
                        <Route path={base.config.path+"popup"} component={PopupPage}></Route>
                        <Redirect to={base.config.path+"home/index"}></Redirect>
                    </Switch>
                </React.Fragment>
            </Router>
        </React.Fragment>
    )
  }
}

export default RouterComponent;

