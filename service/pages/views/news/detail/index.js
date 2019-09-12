import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Spin } from 'antd';
import { withRouter } from 'next/router';
import { CondOperator } from '@nestjsx/crud-request';
import { useQuery } from '@apollo/react-hooks';
import QRCode from 'qrcode';
import BaseLayout from '../../../components/Layout/BaseLayout';
import BreadCrumb from '../../../components/BreadCrumb';

import config from '../../../config/config';
import { createApolloClient } from "../../../lib/apollo";
import { PC_2_MOBILE_MAP } from '../../../lib/enum';
import { buildingQuery, getUrlParam, asyncEffectHandler } from "../../../lib/global";
import { Q_GET_ARTICLE, Q_GET_NEIGHBORING_ARTICLE_NEST } from '../../../gql'

import './new_detail.scss';

const client = createApolloClient();

export default withRouter((props) => {

	const { router } = props;
	const id = getUrlParam(router, 'id');
	if (!id) router.push('/news');

	const [state, setState] = useState({
		prev: null,
		next: null
	})

	const { prev, next } = state;

	const { loading, data: { article } } = useQuery(Q_GET_ARTICLE, {
		fetchPolicy: "no-cache",
		client: client,
		variables: {
			id,
			queryString: buildingQuery({ join: [{ field: "category" }] })
		},
	});

	// useEffect(() => {
	// 	const script = document.createElement('script');
	// 	script.src = "http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];";
	// 	script.type = 'text/javascript';
	// 	document.body.appendChild(script);
	// }, []);

	useEffect(() => {
		asyncEffectHandler(async () => {
			try {
				document.querySelector('#qrcode').src = await QRCode.toDataURL(`${PC_2_MOBILE_MAP['news']}/${id}`);
			} catch (error) {
				console.error(error.message);
			}
			if (article && article.publish_at) {
				const { data } = await client.query({
					query: Q_GET_NEIGHBORING_ARTICLE_NEST,
					fetchPolicy: "no-cache",
					variables: {
						queryPrevString: buildingQuery({
							page: 1,
							limit: 1,
							filter: [
								{ field: 'is_published', operator: CondOperator.EQUALS, value: true },
								{ field: "publish_at", operator: CondOperator.GREATER_THAN, value: article.publish_at },
								// { field: "category.title", operator: CondOperator.EQUALS, value: article.category.title }
							],
							sort: [{ field: 'publish_at', order: 'ASC' }],
						}),
						queryNextString: buildingQuery({
							page: 1,
							limit: 1,
							filter: [
								{ field: 'is_published', operator: CondOperator.EQUALS, value: true },
								{ field: "publish_at", operator: CondOperator.LOWER_THAN, value: article.publish_at },
								// { field: "category.title", operator: CondOperator.EQUALS, value: article.category.title },
							],
							sort: [{ field: 'publish_at', order: 'DESC' }]
						})
					}
				})
				if (data) {
					setState({
						prev: data.prev.data.shift(),
						next: data.next.data.shift()
					})
				}
				
			}
		})
	}, [article]);

	if (loading) return <Spin style={{ position: "fixed", top: "50%", left: "50%" }} tip="正在加载中" />;

	if (article.title) document.title = article.title;

	return (
		<BaseLayout>
			<div className="news-detail-page">
				<BreadCrumb adrname_two={'政策资讯'} adrname_thr={'所有资讯'} />
				{article && (
					<div className="news-detail-main">
						<div className="news-detail-box">
							<div className="img-box">
								{/* <img src={config.staticImgUrl + 'new-img.png'} /> */}
							</div>
							<div className="content-box clearfix" style={{ paddingTop: 20 }}>
								<div className="time-left">
									<p className="tile-p">
										<span>{moment(article.publish_at).format('YY')}</span>
										{moment(article.publish_at).format('M月')}
									</p>
									<p className="come-p icon-fangwen">
										{/* <IconFont className="iconfont" type="icon-denglu" /> by{' '} */}
										作者：{article.author}
									</p>
									<p className="come-p icon-fangwen">来源：{article.source || '本站'}</p>
								</div>
								<div className="content-text">
									<h4 className="news-title" style={{ textAlign: 'center' }}>{article.title}</h4>
									<div dangerouslySetInnerHTML={{ __html: article.text || '' }} />
								</div>
							</div>

							{/* <div className="share">
								<div className="bdsharebuttonbox">
									<a
										href="#"
										className="bds_tsina"
										data-cmd="tsina"
										title="分享到新浪微博"
									/>

									<a
										href="#"
										className="bds_weixin"
										data-cmd="weixin"
										title="分享到微信"
									/>
								</div>
							</div> */}

							<div style={{ width: "150px", margin: "4vw auto 0", display: "block" }}>
								<img id="qrcode" style={{ width: "150px", height: "150px", borderRadius: '6px', display: "block" }} src={config.staticImgUrl + '移动端二维码.png'} alt='placeholder+image' />
								<p style={{ fontSize: "14px", color: "#999", textAlign: "center" }}>在移动端查看此页面</p>
							</div>
						</div>
						<div className="flip-box clearfix">
							{!!prev ? (
								<a className="a-pre" href={`/news/detail?id=${prev.id}`}>
									上一篇：{prev.title}
								</a>
							) : (
									''
								)}
							{!!next ? (
								<a className="a-next" href={`/news/detail?id=${next.id}`}>
									下一篇：{next.title}
								</a>
							) : (
									''
								)}
						</div>
					</div>
				)}
				
			</div>
		</BaseLayout>
	)
})

