/*eslint-disable*/
import React from 'react';
import {withRouter} from 'react-router-dom';
import {request} from "../../assets/js/libs/request";
import './index.css';
import {connect} from "react-redux";
import actions from '../../store/actions';
import { Modal } from 'antd-mobile';
class SearchComponent extends React.Component{
    constructor(props){
        super(props);
        this.state={
            kwords:"",
            hotKwords:[]
        };
        this.aKwords=[];
    }
    componentDidMount(){
        this.getHotKwords()
    }

    componentWillUnmount(){
        this.setState=(state,callback)=>{
            return;
        }
    }
    goSearch(){
        if(!this.state.kwords.match(/^\s*$/)){
            if(this.aKwords.length>0){
                for(let i=0;i<this.aKwords.length;i++){
                    if(this.aKwords[i]===this.state.kwords){
                        this.aKwords.splice(i--,1);
                    }
                }
            }
            this.aKwords.unshift(this.state.kwords);
            this.props.dispatch(actions.search.addKwords({aKwords:this.aKwords}));
        }
        this.goPage("search?kwords="+this.state.kwords);
    }
    goPage(url){
        if(this.props.isLocal){
            this.props.history.replace(base.config.path+"skip");
            setTimeout(()=>{
                this.props.history.replace(base.config.path+url);
            },300);
        }else {
            this.props.history.push(base.config.path + url);
        }
    }
    delHisotryKwords(){
        Modal.alert("","确认要删除吗？",[
            {text:"取消"},
            {text:"确认",onPress:()=>{
                    this.aKwords=[];
                this.props.dispatch(actions.search.delKwords());
            }}
        ])
    }
    getHotKwords(){
        request(window.base.config.baseApi+"/home/public/hotwords?token="+base.config.token).then(res=>{
            if(res.code===200){
                this.setState({hotKwords:res.data});
            }
        });
    }
    render(){
        return(
            <div className={this.props.show?"search-component":'search-component hide'}>
                <div className='search-header'>
                    <div className={'close'} onClick={this.props.close?this.props.close.bind(this):()=>{}}></div>
                    <div className='search-wrap'>
                        <div className={'search-input-wrap'}>
                            <input type="text" className={'search'} placeholder="请输入宝贝名称" value={this.state.kwords} onChange={(e)=>{this.setState({kwords:e.target.value})}} />
                        </div>
                        <button type="button" className='search-btn' onClick={this.goSearch.bind(this)}></button>
                    </div>
                </div>
                {
                    this.props.state.search.aKwords.length>0?
                        <div className='search-main'>
                            <div className='search-title-wrap'>
                                <div className='search-title'>最近搜索</div>
                                <div className='bin' onClick={this.delHisotryKwords.bind(this)}></div>
                            </div>
                            <div className='search-keywords-wrap'>
                                {
                                    this.props.state.search.aKwords.length>0?
                                        this.props.state.search.aKwords.map((item,index)=>{
                                            return (
                                                <div className='keywords' key={index} onClick={this.goPage.bind(this,"search?kwords="+item)}>{item}</div>
                                            )
                                        })
                                        :""
                                }
                            </div>
                        </div>
                        :""
                }
                <div className='search-main'>
                    <div className='search-title-wrap'>
                        <div className='search-title'>热门搜索</div>
                    </div>
                    <div className='search-keywords-wrap'>
                        {
                            this.state.hotKwords.map((item,index)=>{
                                return (
                                    <div className='keywords' key={index} onClick={this.goPage.bind(this,"search?kwords="+item.title)}>{item.title}</div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}
export default connect((state)=>{
    return{
        state:state
    }
})(withRouter(SearchComponent))
