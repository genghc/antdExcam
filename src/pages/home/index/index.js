/*eslint-disable*/
import React from 'react';
import {connect} from 'react-redux';
import actions from '../../../store/actions';
import {request} from '../../../assets/js/libs/request.js';
import {setScrollTop} from '../../../assets/js/utils';
import Css from '../../../assets/css/home/index/index.css';
import "../../../components/swiper/swiper.css";
import Swiper from '../../../components/swiper/swiper.js';
import SearchComponent from '../../../components/search';

class Index extends React.Component {
    constructor(){
        super();
        this.state={
            slides:[],
            isShow:false
        };
        this.count=1;
        this.isScrollTop=true;
    }
    componentDidMount(){
        setScrollTop(base.pages.index.scrollTop);
        window.addEventListener("scroll",this.eventScroll.bind(this));

        request(base.config.baseApi+"/home/index/slide?token="+base.config.token).then(res=>{
            if(res.code===200){
                this.setState({slides:res.data},()=>{
                    //console.log(this.state.slides);
                    new Swiper(this.refs['swpier-wrap'], {
                        autoplay: {
                            delay: 3000,
                            disableOnInteraction: false
                        },//可选选项，自动滑动
                        pagination: {
                            el: this.refs['swiper-pagination'],
                            clickable :true
                        },
                    })
                })
            }
        });
    }
    //监听事件
    eventScroll(){
        if(this.isScrollTop){
            base.pages.index.scrollTop=document.body.scrollTop || document.documentElement.scrollTop;
        }
    }
    pushPage(url){
        this.props.history.push(url);
    }
    componentWillUnmount(){
        this.isScrollTop=false;
        window.removeEventListener("scroll",this.eventScroll.bind(this));
        //防止内存泄漏
        this.setState=(state,callback)=>{
            return;
        }
    }
    //显示搜索组件
    showSearch(){
        this.setState({isShow:true});
    }
    //隐藏搜索组件
    closeSearch(){
        this.setState({isShow:false});
    }
    render() {
        return (
            <div className={Css['page']}>
                <div className={Css['search-header']+" "+Css["red-bg"]}>
                    <div className={Css['classify-icon']}></div>
                    <div className={Css['search-wrap']} onClick={this.showSearch.bind(this)}>
                        <div className={Css['search-icon']}></div>
                        <div className={Css['search-text']}>请输入宝贝名称</div>
                    </div>
                    <div className={Css['login-wrap']}>
                        {/*<div className={Css['my']}></div>*/}
                        <div className={Css['login-text']}>登录</div>
                    </div>
                </div>
                <div ref="swpier-wrap" className={"swiper-container "+Css['swiper-wrap']}>
                    <div className="swiper-wrapper">
                        {
                            this.state.slides!=null?
                                this.state.slides.map((item,index)=>{
                                    return(
                                        <div key={index} className="swiper-slide"><a href={item.webs} target="_blank" rel="noopener noreferrer"><img src={item.image} alt={item.title}/></a></div>
                                    )
                                }):""
                        }
                    </div>
                    <div ref="swiper-pagination" className="swiper-pagination"></div>
                </div>
                <div className={Css['quick-nav']}>
                    <ul className={Css['item']}>
                        <li className={Css['item-img']}><img src="//vueshop.glbuys.com/uploadfiles/1484287695.png" alt=""/></li>
                        <li className={Css['item-text']}>潮流女装</li>
                    </ul>
                    <ul className={Css['item']}>
                        <li className={Css['item-img']}><img src="//vueshop.glbuys.com/uploadfiles/1484287695.png" alt=""/></li>
                        <li className={Css['item-text']}>潮流女装</li>
                    </ul>
                    <ul className={Css['item']}>
                        <li className={Css['item-img']}><img src="//vueshop.glbuys.com/uploadfiles/1484287695.png" alt=""/></li>
                        <li className={Css['item-text']}>潮流女装</li>
                    </ul>
                    <ul className={Css['item']}>
                        <li className={Css['item-img']}><img src="//vueshop.glbuys.com/uploadfiles/1484287695.png" alt=""/></li>
                        <li className={Css['item-text']}>潮流女装</li>
                    </ul>
                </div>
                <div className={Css['goods-level-wrap']}>
                    <div className={Css['classify-title']+" "+Css['color1']}>—— 潮流女装 ——</div>
                    <div className={Css['goods-level1-wrap']}>
                        <div className={Css['goods-level1-item0']}>
                            <div className={Css['goods-title']} >潮流女装产品</div>
                            <div className={Css["goods-text"]}>精品打折</div>
                            <div className={Css['goods-price1']}>10元</div>
                            <div className={Css['goods-img']}><img  src="//vueshop.glbuys.com/uploadfiles/1524556409.jpg" alt="" /></div>
                        </div>
                        <div className={Css['goods-level1-item1']}>
                            <div className={Css['goods-row']}>
                                <div className={Css['goods-row-title']}>精品男装</div>
                                <div className={Css['goods-row-text']}>品质精挑</div>
                                <div className={Css['goods-row-img']}><img src="//vueshop.glbuys.com/uploadfiles/1524556409.jpg" alt="" /></div>
                            </div>
                            <div className={Css['goods-row']}>
                                <div className={Css['goods-row-title']}>精品男装</div>
                                <div className={Css['goods-row-text']}>品质精挑</div>
                                <div className={Css['goods-row-img']}><img src="//vueshop.glbuys.com/uploadfiles/1524556409.jpg" alt="" /></div>
                            </div>
                        </div>
                    </div>
                    <div className={Css['goods-list-wrap']}>
                        <div className={Css['goods-list']}>
                            <div className={Css['title']}>精品女装</div>
                            <div className={Css['image']}><img src="//vueshop.glbuys.com/uploadfiles/1524556409.jpg" alt="" /></div>
                            <div className={Css['price']}>¥100</div>
                            <div className={Css['unprice']}>¥200</div>
                        </div>
                        <div className={Css['goods-list']}>
                            <div className={Css['title']}>精品女装</div>
                            <div className={Css['image']}><img src="//vueshop.glbuys.com/uploadfiles/1524556409.jpg" alt="" /></div>
                            <div className={Css['price']}>¥100</div>
                            <div className={Css['unprice']}>¥200</div>
                        </div>
                        <div className={Css['goods-list']}>
                            <div className={Css['title']}>精品女装</div>
                            <div className={Css['image']}><img src="//vueshop.glbuys.com/uploadfiles/1524556409.jpg" alt="" /></div>
                            <div className={Css['price']}>¥100</div>
                            <div className={Css['unprice']}>¥200</div>
                        </div>
                        <div className={Css['goods-list']}>
                            <div className={Css['title']}>精品女装</div>
                            <div className={Css['image']}><img src="//vueshop.glbuys.com/uploadfiles/1524556409.jpg" alt="" /></div>
                            <div className={Css['price']}>¥100</div>
                            <div className={Css['unprice']}>¥200</div>
                        </div>
                    </div>
                </div>
                <div className={Css['goods-level-wrap']}>
                    <div className={Css['classify-title']+" "+Css['color2']}>—— 品牌男装 ——</div>
                        <div className={Css['goods-level1-wrap']}>
                            <div className={Css['goods-level1-item0']}>
                                <div className={Css['goods-title2']}>潮流女装产品</div>
                                <div className={Css["goods-text2"]}>火爆开售</div>
                                <div className={Css['goods-img2']}><img  src="//vueshop.glbuys.com/uploadfiles/1524556409.jpg" alt="" /></div>
                            </div>
                            <div className={Css['goods-level1-item0']}>
                                <div className={Css['goods-title2']}>潮流女装产品</div>
                                <div className={Css["goods-text2"]}>火爆开售</div>
                                <div className={Css['goods-img2']}><img  src="//vueshop.glbuys.com/uploadfiles/1524556409.jpg" alt="" /></div>
                            </div>
                        </div>
                        <div className={Css['goods-list-wrap']}>
                            <div className={Css['goods-list']}>
                                <div className={Css['title']}>精品女装</div>
                                <div className={Css['image']}><img src="//vueshop.glbuys.com/uploadfiles/1524556409.jpg" alt="" /></div>
                                <div className={Css['price']}>¥100</div>
                                <div className={Css['unprice']}>¥200</div>
                            </div>
                            <div className={Css['goods-list']}>
                                <div className={Css['title']}>精品女装</div>
                                <div className={Css['image']}><img src="//vueshop.glbuys.com/uploadfiles/1524556409.jpg" alt="" /></div>
                                <div className={Css['price']}>¥100</div>
                                <div className={Css['unprice']}>¥200</div>
                            </div>
                            <div className={Css['goods-list']}>
                                <div className={Css['title']}>精品女装</div>
                                <div className={Css['image']}><img src="//vueshop.glbuys.com/uploadfiles/1524556409.jpg" alt="" /></div>
                                <div className={Css['price']}>¥100</div>
                                <div className={Css['unprice']}>¥200</div>
                            </div>
                            <div className={Css['goods-list']}>
                                <div className={Css['title']}>精品女装</div>
                                <div className={Css['image']}><img src="//vueshop.glbuys.com/uploadfiles/1524556409.jpg" alt="" /></div>
                                <div className={Css['price']}>¥100</div>
                                <div className={Css['unprice']}>¥200</div>
                            </div>
                        </div>
                </div>
                <div className={Css['goods-level-wrap']}>
                    <div className={Css['classify-title']+" "+Css['color3']}>—— 潮流电玩 ——</div>
                    <div className={Css['goods-level1-wrap']}>
                        <div className={Css['goods-level1-item0']}>
                            <div className={Css['goods-title']} >潮流女装产品</div>
                            <div className={Css["goods-text"]}>精品打折</div>
                            <div className={Css['goods-price3']}>10元</div>
                            <div className={Css['goods-img']}><img  src="//vueshop.glbuys.com/uploadfiles/1524556409.jpg" alt="" /></div>
                        </div>
                        <div className={Css['goods-level1-item1']}>
                            <div className={Css['goods-row']}>
                                <div className={Css['goods-row-title']}>精品男装</div>
                                <div className={Css['goods-row-text']}>品质精挑</div>
                                <div className={Css['goods-row-img']}><img src="//vueshop.glbuys.com/uploadfiles/1524556409.jpg" alt="" /></div>
                            </div>
                            <div className={Css['goods-row']}>
                                <div className={Css['goods-row-title']}>精品男装</div>
                                <div className={Css['goods-row-text']}>品质精挑</div>
                                <div className={Css['goods-row-img']}><img src="//vueshop.glbuys.com/uploadfiles/1524556409.jpg" alt="" /></div>
                            </div>
                        </div>
                    </div>
                    <div className={Css['goods-list-wrap']}>
                        <div className={Css['goods-list']}>
                            <div className={Css['title']}>精品女装</div>
                            <div className={Css['image']}><img src="//vueshop.glbuys.com/uploadfiles/1524556409.jpg" alt="" /></div>
                            <div className={Css['price']}>¥100</div>
                            <div className={Css['unprice']}>¥200</div>
                        </div>
                        <div className={Css['goods-list']}>
                            <div className={Css['title']}>精品女装</div>
                            <div className={Css['image']}><img src="//vueshop.glbuys.com/uploadfiles/1524556409.jpg" alt="" /></div>
                            <div className={Css['price']}>¥100</div>
                            <div className={Css['unprice']}>¥200</div>
                        </div>
                        <div className={Css['goods-list']}>
                            <div className={Css['title']}>精品女装</div>
                            <div className={Css['image']}><img src="//vueshop.glbuys.com/uploadfiles/1524556409.jpg" alt="" /></div>
                            <div className={Css['price']}>¥100</div>
                            <div className={Css['unprice']}>¥200</div>
                        </div>
                        <div className={Css['goods-list']}>
                            <div className={Css['title']}>精品女装</div>
                            <div className={Css['image']}><img src="//vueshop.glbuys.com/uploadfiles/1524556409.jpg" alt="" /></div>
                            <div className={Css['price']}>¥100</div>
                            <div className={Css['unprice']}>¥200</div>
                        </div>
                    </div>
                </div>
                <div className={Css['reco-title-wrap']}>
                    <div className={Css["line"]}></div>
                    <div className={Css['reco-text-wrap']}>
                        <div className={Css['reco-icon']}></div>
                        <div className={Css['reco-text']}>为您推荐</div>
                    </div>
                    <div className={Css["line"]}></div>
                </div>
                <div className={Css['reco-item-wrap']}>
                    <div className={Css['reco-item']}>
                        <div className={Css['image']}><img src="//vueshop.glbuys.com/uploadfiles/1484283665.jpg" alt="" /></div>
                        <div className={Css['title']}>大码女装</div>
                        <div className={Css['price']}>¥100</div>
                    </div>
                    <div className={Css['reco-item']}>
                        <div className={Css['image']}><img src="//vueshop.glbuys.com/uploadfiles/1484283665.jpg" alt="" /></div>
                        <div className={Css['title']}>大码女装</div>
                        <div className={Css['price']}>¥100</div>
                    </div>
                    <div className={Css['reco-item']}>
                        <div className={Css['image']}><img src="//vueshop.glbuys.com/uploadfiles/1484283665.jpg" alt="" /></div>
                        <div className={Css['title']}>大码女装</div>
                        <div className={Css['price']}>¥100</div>
                    </div>
                    <div className={Css['reco-item']}>
                        <div className={Css['image']}><img src="//vueshop.glbuys.com/uploadfiles/1484283665.jpg" alt="" /></div>
                        <div className={Css['title']}>大码女装</div>
                        <div className={Css['price']}>¥100</div>
                    </div>
                    <div className={Css['reco-item']}>
                        <div className={Css['image']}><img src="//vueshop.glbuys.com/uploadfiles/1484283665.jpg" alt="" /></div>
                        <div className={Css['title']}>大码女装</div>
                        <div className={Css['price']}>¥100</div>
                    </div>
                    <div className={Css['reco-item']}>
                        <div className={Css['image']}><img src="//vueshop.glbuys.com/uploadfiles/1484283665.jpg" alt="" /></div>
                        <div className={Css['title']}>大码女装</div>
                        <div className={Css['price']}>¥100</div>
                    </div>
                </div>
                <SearchComponent show={this.state.isShow} close={this.closeSearch.bind(this)}></SearchComponent>
            </div>
        )
    }
}
export default connect((state)=>{
    return {
        state:state
    }
})(Index)
