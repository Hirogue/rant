import { Breadcrumb, Icon } from 'antd';

import './breadcrumb.scss'

export default (props) => (
    <div className="breadcrumb-container">
        <Breadcrumb className="breadcrumb-container">
            <Breadcrumb.Item>
                <Icon type="home" />
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                <span>首页</span>
            </Breadcrumb.Item>
            {
              props.adrname_two ? (<Breadcrumb.Item><span>{ props.adrname_two }</span></Breadcrumb.Item>) : null
            }
            {
              props.adrname_thr ? (<Breadcrumb.Item><span>{ props.adrname_thr }</span></Breadcrumb.Item>) : null
            }
        </Breadcrumb>
    </div>
)