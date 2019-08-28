import IconFont from '../IconFont';

import './tag_top.scss';

export default (props) => (
	<div className="tag-box">
        <p className="tag">
            <IconFont className="iconfont" type={props.icon} />
            <span>{props.name}</span>
        </p>
    </div>
);
