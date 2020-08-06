/*eslint-disable*/
import React from 'react'
import Css from '../../../assets/css/home/goods/search.css';
import SearchComponent from '../../../components/search';
import IScroll from '../../../assets/js/libs/iscroll.js';
import {localParam,lazyImg} from '../../../assets/js/utils';
import {request} from '../../../assets/js/libs/request.js';
import UpRefresh from '../../../assets/js/libs/uprefresh.js';
export default class SearchPage extends React.Component {
    constructor(props){
        super(props);
        this.state={
            isMask:false,
            screenMove:Css['unmove'],
            kwords:localParam(props.location.search).search.kwords?decodeURIComponent(localParam(props.location.search).search.kwords):"",
            isShow:false,
            goods:[],
            isPriceOrder:false,
            isSalesOrder:false,
            priceOrder:[
                {text:"综合",type:"all",checked:true},
                {text:"价格从低到高",type:"up",checked:false},
                {text:"价格从高到低",type:"down",checked:false}
            ],
            goodsTotal:0,
            price1:"",
            price2:"",
            classifyData:{
                checked:false,
                data:[]
            },
            prices:{
                checked:false,
                data:[
                    {
                        price1:1,
                        price2:50,
                        checked:false
                    },
                    {
                        price1:51,
                        price2:99,
                        checked:false
                    },
                    {
                        price1:100,
                        price2:300,
                        checked:false
                    },
                    {
                        price1:301,
                        price2:1000,
                        checked:false
                    },
                    {
                        price1:1001,
                        price2:4000,
                        checked:false
                    },
                    {
                        price1:4001,
                        price2:9999,
                        checked:false
                    }
                ]
            }
        };
        this.myScroll=null;
        this.maxPage=0;
        this.sParam="";
        this.oType="all";
        this.cid=""
    }
    componentDidMount(){
        this.refs['screen'].addEventListener("touchmove",function (e) {
            e.preventDefault();
        },false);
        this.myScroll= new IScroll(this.refs['screen'], {
            scrollX : false,
            scrollY : true,
            preventDefault : false
        });
        this.getData();
        this.getClassify();
    }
    //显示搜索组件
    showSearch(){
        this.setState({isShow:true});
    }
    //隐藏搜索组件
    closeSearch(){
        this.setState({isShow:false});
    }
    //显示筛选面板
    showScreen(){
        this.setState({isMask:true,screenMove:Css['move']});
    }
    //隐藏筛选面板
    hideScreen(){
        this.setState({isMask:false,screenMove:Css['unmove']});
    }
    getParam(){
        this.sParam="kwords="+this.state.kwords+"&param=&page=1&price1="+this.state.price1+"&price2="+this.state.price2+"&otype="+this.oType+"&cid="+this.cid
    }
    //显示产品数据
    getData(){
        this.getParam();
        let url=base.config.baseApi+"/home/goods/search?"+this.sParam+"&page=1&token="+base.config.token;
        request(url).then(res=>{
            if(res.code===200){
                this.setState({goods:res.data});
                this.maxPage=res.pageinfo.pagenum;
                this.setState({goodsTotal:res.pageinfo.total});
                this.getNextData();
                lazyImg();
            }else{
                this.setState({goods:[]});
            }
        });
    }
    getNextData(){
        new UpRefresh({"curPage":1,"maxPage":this.maxPage,"offsetBottom":100},(curPage)=>{
            let url=base.config.baseApi+"/home/goods/search?"+this.sParam+"&page="+curPage+"&token="+base.config.token;
            request(url).then(res=>{
                if(res.code===200){
                    let goodsData=this.state.goods;
                    goodsData.push(...res.data);
                    this.setState({goods:goodsData});
                }
            });
        });
    }
    //显示隐藏价格排序菜单
    handlePriceMenu(){
        this.setState({isPriceOrder:!this.state.isPriceOrder},()=>{
            if(this.state.isPriceOrder){
                this.setState({isSalesOrder:false});
            }
        });
    }
    //选择价格排序
    selectPriceOrder(index){
        let priceOrder=this.state.priceOrder;
        for(let key in priceOrder){
            if(priceOrder[key].checked){
                priceOrder[key].checked=false;
                break;
            }
        }
        priceOrder[index].checked=true;
        this.setState({priceOrder:priceOrder});
        this.oType=priceOrder[index].type;
        this.getData();
    }
    //销量排序
    selectSalesOrder(){
        this.setState({isSalesOrder:true,isPriceOrder:false});
        this.oType="sales";
        this.getData();
    }
    componentWillUnmount(){
        this.setState=(state,callback)=>{
            return;
        }
    }
    //获取分类
    getClassify(){
        request(base.config.baseApi+"/home/category/menu?token="+base.config.token).then(res=>{
            if(res.code===200){
                let classifyData=this.state.classifyData;
                classifyData.data=res.data;
                for(let i=0;i<classifyData.data.length;i++){
                    classifyData.data[i].checked=false;
                }
                this.setState({classifyData:classifyData});
                this.myScroll.refresh();
            }
        });
    }
    //显示隐藏分类
    handleClassify(){
        let classifyData=this.state.classifyData;
        classifyData.checked=!classifyData.checked;
        this.setState({classifyData:classifyData})
    }
    //选择分类
    selectClassifyData(index){
        let classifyData=this.state.classifyData;

        for(let key in classifyData.data){
            // if(key!=index){
            //     classifyData.data[key].checked=false;
            // }
            if(classifyData.data[key].checked){
                classifyData.data[key].checked=classifyData.data[index].checked;
                break;
            }
        }

        classifyData.data[index].checked=!classifyData.data[index].checked;
        this.setState({classifyData:classifyData});
        this.cid=classifyData.data[index].checked?classifyData.data[index].cid:"";
    }
    //确认搜索
    sureSearch(){
        this.hideScreen();
        this.getData();
    }
    //选择价格
    selectPrice(index){
        let prices=this.state.prices;
        for(let key in prices.data){
            if(prices.data[key].checked){
                prices.data[key].checked=prices.data[index].checked;
                break;
            }
        }
        prices.data[index].checked=!prices.data[index].checked;
        this.setState({prices:prices,price1:prices.data[index].checked?prices.data[index].price1:"",price2:prices.data[index].checked?prices.data[index].price2:""});
    }
    //显示隐藏价格筛选
    handlePrice(){
        let prices=this.state.prices;
        prices.checked=!prices.checked;
        this.setState({prices:prices});
    }
    render() {
        return (
            <div className={Css['page']}>
                <div className={Css['search-top']}>
                    <div className={Css['search-header']}>
                        <div className={Css['back']} onClick={this.props.history.goBack.bind(this)}></div>
                        <div className={Css['search-wrap']} onClick={this.showSearch.bind(this)}>
                            <div className={Css['search-icon']}></div>
                            <div className={Css['search-text']}>{this.state.kwords}</div>
                        </div>
                        <div className={Css['screen-btn']} onClick={this.showScreen.bind(this)}>筛选</div>
                    </div>
                    <div className={Css['order-main']}>
                        <div className={this.state.isPriceOrder?Css['order-item']+" "+Css['active']:Css['order-item']} onClick={this.handlePriceMenu.bind(this)}>
                            <div className={Css["order-text"]}>综合</div>
                            <div className={Css['order-icon']}></div>
                            <ul className={this.state.isPriceOrder?Css['order-menu']:Css['order-menu']+" hide"}>
                                {
                                    this.state.priceOrder.map((item,index)=>{
                                        return (
                                            <li className={item.checked?Css['active']:""} key={index} onClick={this.selectPriceOrder.bind(this,index)}>{item.text}</li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div className={this.state.isSalesOrder?Css['order-item']+" "+Css['active']:Css['order-item']} onClick={this.selectSalesOrder.bind(this)}>
                            <div className={Css["order-text"]}>销量</div>
                        </div>
                    </div>
                </div>
                <div className={Css['goods-main']}>
                    {
                        this.state.goods.length>0?
                            this.state.goods.map((item,index)=>{
                                return (
                                    <div className={Css['goods-list']} key={index}>
                                        <div className={Css['image']}><img  src={require("../../../assets/images/common/lazyImg.jpg")} data-echo={item.image} /></div>
                                        <div className={Css['goods-content']}>
                                            <div className={Css['goods-title']}>{item.title}</div>
                                            <div className={Css['price']}>¥{item.price}</div>
                                            <div className={Css['sales']}>销量<span>{item.sales}</span>件</div>
                                        </div>
                                    </div>
                                )
                            })
                            :
                            <div className="null-item">没有相关商品！</div>
                    }
                </div>
                <div ref="mask" className={this.state.isMask?Css['mask']:Css['mask']+" hide"} onClick={this.hideScreen.bind(this)}></div>
                <div ref="screen" className={Css['screen']+" "+this.state.screenMove}>
                    <div>
                        <div className={Css['attr-wrap']}>
                            <div className={Css['attr-title-wrap']} onClick={this.handleClassify.bind(this)}>
                                <div className={Css['attr-name']}>分类</div>
                                <div className={this.state.classifyData.checked?Css['attr-icon']+" "+Css['up']:Css['attr-icon']}></div>
                            </div>
                            <div className={this.state.classifyData.checked?Css['item-wrap']+" height-hide":Css['item-wrap']}>
                                {
                                    this.state.classifyData.data.map((item,index)=>{
                                        return (
                                            <div key={index} className={item.checked?Css['item']+" "+Css['active']:Css['item']} onClick={this.selectClassifyData.bind(this,index)}>{item.title}</div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div style={{width:"100%",height:"1px",backgroundColor:"#EFEFEF"}}></div>
                        <div className={Css['attr-wrap']}>
                            <div className={Css['attr-title-wrap']} onClick={this.handlePrice.bind(this)}>
                                <div className={Css['attr-name']}>价格区间</div>
                                <div className={Css['price-wrap']}>
                                    <div className={Css['price-input']}><input type="tel" placeholder="最低价" value={this.state.price1} onClick={(e)=>{e.stopPropagation()}} onChange={(e)=>{this.setState({price1:e.target.value})}}  /></div>
                                    <div className={Css['price-line']}></div>
                                    <div className={Css['price-input']}><input type="tel" placeholder="最高价" value={this.state.price2} onClick={(e)=>{e.stopPropagation()}} onChange={(e)=>{this.setState({price2:e.target.value})}} /></div>
                                </div>
                                <div className={this.state.prices.checked?Css['attr-icon']+" "+Css['up']:Css['attr-icon']}></div>
                            </div>
                            <div className={this.state.prices.checked?Css['item-wrap']+" height-hide":Css['item-wrap']}>
                                {
                                    this.state.prices.data.map((item,index)=>{
                                        return(
                                            <div key={index} className={item.checked?Css['item']+" "+Css['active']:Css['item']} onClick={this.selectPrice.bind(this,index)}>{item.price1}-{item.price2}</div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div style={{width:"100%",height:"0.3rem",backgroundColor:"#EFEFEF"}}></div>
                            <React.Fragment>
                                <div className={Css['attr-wrap']}>
                                    <div className={Css['attr-title-wrap']}>
                                        <div className={Css['attr-name']}>颜色</div>
                                        <div className={Css['attr-icon']+" "+Css['up']}></div>
                                    </div>
                                    <div className={Css['item-wrap']}>
                                        <div className={Css['item']+" "+Css['active']}>白色</div>
                                        <div className={Css['item']+" "+Css['active']}>黑色</div>
                                    </div>
                                </div>
                                <div className={Css['attr-wrap']}>
                                    <div className={Css['attr-title-wrap']}>
                                        <div className={Css['attr-name']}>尺码</div>
                                        <div className={Css['attr-icon']+" "+Css['up']}></div>
                                    </div>
                                    <div className={Css['item-wrap']}>
                                        <div className={Css['item']+" "+Css['active']}>30</div>
                                        <div className={Css['item']+" "+Css['active']}>40</div>
                                    </div>
                                </div>
                                <div style={{width:"100%",height:"1px",backgroundColor:"#EFEFEF"}}></div>
                            </React.Fragment>
                            <div style={{width:"100%",height:"1.2rem"}}></div>
                    </div>
                    <div className={Css['handel-wrap']}>
                        <div className={Css['item']}>共<span>{this.state.goodsTotal}</span>件</div>
                        <div className={Css['item']+" "+Css['reset']}>全部重置</div>
                        <div className={Css['item']+" "+Css['sure']} onClick={this.sureSearch.bind(this)}>确定</div>
                    </div>
                </div>
                <SearchComponent show={this.state.isShow} close={this.closeSearch.bind(this)} isLocal={true}></SearchComponent>
            </div>
        )
    }
}
