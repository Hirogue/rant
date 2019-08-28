import IconFont from '../IconFont';

import './sort_mod.scss';

export default () => (
    <div className="sort-mod">
        <ul className="sort-btns">
            <li className="active"><span>综合排序</span><IconFont className="iconfont" type={'icon-jiantou-upper'} /></li>
            <li><span>更新时间</span><IconFont className="iconfont" type={'icon-jiantou-lower'} /></li>
            <li><span>金额排序</span><IconFont className="iconfont" type={'icon-jiantou-lower'} /></li>
        </ul>
        <p className="result">共有 <span>3000+</span> 个符合要求的资金信息</p>
    </div>
)