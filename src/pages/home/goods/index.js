import React from 'react'
import {setScrollTop} from '../../../assets/js/utils';
export default class GoodsPage extends React.Component {
    componentDidMount(){
        setScrollTop()
    }
    render() {
        return (
            <div>
                <button type="button" onClick={this.props.history.go.bind(this,-1)}>返回</button>产品页面
            </div>
        )
    }
}
