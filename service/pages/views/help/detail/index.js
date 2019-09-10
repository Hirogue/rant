import React from 'react';
import moment from 'moment';
import { Spin, Empty } from 'antd';
import { withRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import BaseLayout from '../../../components/Layout/BaseLayout';
import BreadCrumb from '../../../components/BreadCrumb';

import IconFont from '../../../components/IconFont';
import './help_detail.scss';
import { createApolloClient } from "../../../lib/apollo";
import { buildingQuery, getUrlParam } from "../../../lib/global";
import { Q_GET_DOCUMENT } from '../../../gql'

const client = createApolloClient();
const defaultVariables = {
	join: [{ field: 'category' }],
	sort: [{ field: 'publish_at', order: 'DESC' }, { field: 'sort', order: 'DESC' }],
};

export default withRouter((props) => {

	const { router } = props;
	const id = getUrlParam(router, 'id');

	const { loading, data } = useQuery(Q_GET_DOCUMENT, {
		client: client,
		variables: {
			id,
			queryString: buildingQuery(defaultVariables)
		}
	});

	return (
		<BaseLayout>
			<div className="help-detail-main">
				<BreadCrumb adrname_two={'帮助中心'} />
				<div className="help-content">
					<div className="left">
						<h4 className="left-title">{'帮助中心'}</h4>
						{/* <a className="nav-item active">新手指引</a>
                    <a className="nav-item">法律法规</a>
                    <a className="nav-item">合作机构</a>
                    <a className="nav-item">保障体系</a>
                    <a className="nav-item">网站公告</a> */}
						<div className="hotline">
							<div className="icon-name">
								<IconFont className="iconfont" type="icon-icon-test" />
								<span>服务热线</span>
							</div>
							<h4 className="iphone">0791-87705085</h4>
						</div>
					</div>
					<div className="right">
						<p className="list-title">{data ? data.title : ''}</p>
						{loading ? (
							<Spin style={{ margin: "10vw  45%" }} tip="正在加载中" />
						) : (
							data ? (
								<div className="content-main">
									<div className="content-title">
										<h4>{data.title}</h4>
										<p>{moment(data.publish_at).format('YYYY-MM-DD HH:mm:ss')}</p>
									</div>
									<div className="content-text" dangerouslySetInnerHTML={{ __html: data.text || '' }} />
								</div>
							) : (
								<Empty style={{ margin: "10vw auto" }} description="暂无数据" />
							)
						)}
					</div>
				</div>
			</div>
		</BaseLayout>
	)
})


