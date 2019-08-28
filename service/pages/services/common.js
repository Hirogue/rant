import _ from 'lodash';
import crypto from 'crypto';
import moment from 'moment';
import { apiGet, apiPost, apiPut, upload2Backend } from '../utils/http';

export async function getSiteInfo() {
	const res = await apiGet('/siteInfo');
	const { info } = res.data;

	return {
		title: _.find(info, (item) => item.tree_path === '站点信息.网站维护.页面标题').value,
		hotline: _.find(info, (item) => item.tree_path === '站点信息.网站维护.客服热线').value,
		copyright: _.find(info, (item) => item.tree_path === '站点信息.网站维护.版权所有').value,
		icp: _.find(info, (item) => item.tree_path === '站点信息.网站维护.ICP备案号').value,
		icpLink: _.find(info, (item) => item.tree_path === '站点信息.网站维护.ICP备案号').link,
		picp: _.find(info, (item) => item.tree_path === '站点信息.网站维护.公网安备').value,
		picpLink: _.find(info, (item) => item.tree_path === '站点信息.网站维护.公网安备').link,
		logo: _.find(info, (item) => item.tree_path === '站点信息.网站维护.网站图标').value,
		wechatQRCode: _.find(info, (item) => item.tree_path === '站点信息.网站维护.微信二维码').value,
		fax: _.find(info, (item) => item.tree_path === '站点信息.网站维护.传真号码').value,
		postCode: _.find(info, (item) => item.tree_path === '站点信息.网站维护.邮政编码').value,
		phone: _.find(info, (item) => item.tree_path === '站点信息.网站维护.联系电话').value,
		email: _.find(info, (item) => item.tree_path === '站点信息.网站维护.联系邮箱').value,
		address: _.find(info, (item) => item.tree_path === '站点信息.网站维护.公司地址').value,
		profile: _.find(info, (item) => item.tree_path === '站点信息.网站维护.平台简介').value,
		profileImg: _.find(info, (item) => item.tree_path === '站点信息.网站维护.平台简介图').value,
		entryCount: _.find(info, (item) => item.tree_path === '站点信息.网站维护.已入驻金融机构').value,
		projectCount: _.find(info, (item) => item.tree_path === '站点信息.网站维护.已对接项目方').value,
		otherInfo: _.find(info, (item) => item.tree_path === '站点信息.网站维护.其他').value,
		amount: _.find(info, (item) => item.tree_path === '站点信息.网站维护.成功对接金额').value,
		jlProfile: _.find(info, (item) => item.tree_path === '站点信息.网站维护.江旅简介').value,
		aboutData: _.filter(info, (item) => item.tree_path.startsWith('站点信息.平台征程.')),
		mapLinks: _.filter(info, (item) => item.tree_path.startsWith('站点信息.站点地图.')),
		links: _.filter(info, (item) => item.tree_path.startsWith('站点信息.友情链接.'))
	};
}

export async function getMainData() {
	const res = await apiGet('/maindata');
	const { info } = res.data;
	const mainData = info.mainData;

	return {
		fundAmount: _.find(mainData, (item) => item.tree_path === '栏目.投融.投融金额'),
		fundType: _.find(mainData, (item) => item.tree_path === '栏目.投融.资金类型'),
		financingType: _.find(mainData, (item) => item.tree_path === '栏目.投融.融资方式'),
		investmentType: _.find(mainData, (item) => item.tree_path === '栏目.投融.投资方式'),
		investmentStage: _.find(mainData, (item) => item.tree_path === '栏目.投融.投资阶段'),
		projectStage: _.find(mainData, (item) => item.tree_path === '栏目.投融.项目阶段'),
		industry: _.find(mainData, (item) => item.tree_path === '栏目.投融.投资行业.旅游行业'),
		area: _.find(mainData, (item) => item.tree_path === '栏目.项目.所在地区'),
		investmentArea: _.find(mainData, (item) => item.tree_path === '栏目.投融.投资地区'),
		services: _.filter(mainData, (item) => item.tree_path.startsWith('栏目.服务商.')),
		products: _.filter(mainData, (item) => item.tree_path.startsWith('栏目.金融服务.')),
		siteList: info.siteList
	};
}

export async function getPageSEO() {
	const res = await apiGet('/pageSEO');
	const { info } = res.data;

	return info;
}

export async function apiGetLatestNews() {
	const res = await apiGet('/news/latest');

	console.log(res);
}

export async function apiGetNews() {
	const res = await apiGet('/news/all');

	const news = _.sortBy(res.data, [ 'sort', (item) => -moment(item.release_datetime).valueOf() ]);

	return {
		notices: _.take(_.filter(news, (item) => item.category_name === '通知公告'), 4),
		latest: _.take(_.filter(news, (item) => item.category_name === '江旅资讯' || item.category_name === '行业快讯'), 4),
		industryNews: _.filter(news, (item) => item.category_name === '行业快讯'),
		researchReports: _.filter(news, (item) => item.category_name === '投融研报'),
		jlNews: _.filter(news, (item) => item.category_name === '江旅资讯'),
		schoolNews: _.filter(news, (item) => item.category_name === '投融学堂')
	};
}

export async function apiLogin(phone, password) {
	return await apiPost('/login', {
		credential: phone,
		password: crypto.createHash('md5').update(password).digest('hex')
	});
}

export async function apiRegister(phone, password, smsCaptcha) {
	return await apiPost(
		'/api/register/ssr',
		[
			{
				credential: phone,
				real_name: '',
				phonenumber: phone,
				password: crypto.createHash('md5').update(password).digest('hex')
			}
		],
		{
			headers: {
				SmsAuthentication: JSON.stringify({
					phonenumber: phone,
					answer: smsCaptcha
				})
			}
		}
	);
}

export async function apiResetPassword(phone, password, smsCaptcha) {
	return await apiPost(
		'/api/register/ssr/password',
		{
			credential: phone,
			password: crypto.createHash('md5').update(password).digest('hex')
		},
		{
			headers: {
				SmsAuthentication: JSON.stringify({
					phonenumber: phone,
					answer: smsCaptcha,
					template: 'PASSWORD_RESET'
				})
			}
		}
	);
}

export async function apiSendSMSCode(phone) {
	return await apiGet(`/api/verification/sms/register/${phone}`);
}

export async function apiSendPasswordSMSCode(phone) {
	return await apiGet(`/api/verification/sms/password/${phone}`);
}

export async function apiGetNewsDetail(id) {
	return await apiGet(`/news/details/${id}`);
}

export async function apiGetServiceDetail(id) {
	return await apiGet(`/service/details/${id}`);
}

export async function apiGetProductDetail(id) {
	return await apiGet(`/product/details/${id}`);
}

export async function apiGetFinanceDetail(id) {
	return await apiGet(`/finance/details/${id}`);
}

export async function apiGetProjectDetail(id) {
	return await apiGet(`/project/details/${id}`);
}

export async function apiGetServices() {
	return await apiGet('/service/list');
}

export async function apiGetFinance() {
	return await apiGet('/finances');
}

export async function apiGetProject() {
	return await apiGet('/projects');
}

export async function apiGetProducts() {
	return await apiGet('/products');
}

export async function apiGetIndex() {
	return await apiGet('/index');
}

export async function apiGetUserInfo(id) {
	return await apiGet(`/api/users/${id}`);
}

export async function apiUpdateUserInfo(payload) {
	return await apiPut('/user', payload);
}

export async function uploadFile(file) {
	const res = await upload2Backend(
		file,
		'services',
		'services',
		`${moment().format('YYYYMMDDHHmmss')}_${file.name}`,
		{
			action: 'RENAME'
		}
	);

	if (!res.data) return null;

	const { preUrl, result } = res.data;

	return {
		url: preUrl + result.substring(1, result.length),
		target: result
	};
}

export async function apiPublishProject(payload) {
	return await apiPost('/project', payload);
}

export async function apiUpdateProject(payload) {
	return await apiPut('/project', payload);
}

export async function apiGetProjectByUserId(id) {
	return await apiGet(`/projects/${id}`);
}

export async function apiPublishService(payload) {
	return await apiPost('/service', payload);
}

export async function apiUpdateService(payload) {
	return await apiPut('/service', payload);
}

export async function apiGetServiceByUserId(id) {
	return await apiGet(`/services/${id}`);
}

export async function apiGetProductApplyByUserId(id) {
	return await apiGet(`/api/applys/user/${id}`);
}

export async function apiGetServiceApplyByUserId(id) {
	return await apiGet(`/api/applys/service/${id}`);
}

export async function apiGetProjectApplyByUserId(id) {
	return await apiGet(`/api/applys/project/${id}`);
}

export async function apiUpdateProductApply(payload) {
	return await apiPut('/api/applys', payload);
}

export async function apiGetApplys() {
	return await apiGet('/user/apply');
}

export async function apiApplyProduct(id) {
	return await apiPost(`/user/apply/product`, { id });
}

export async function apiApplyProject(id) {
	return await apiPost(`/user/apply/project`, { id });
}

export async function apiApplyService(id) {
	return await apiPost(`/user/apply/service`, { id });
}

export async function apiApplyContent(id) {
	return await apiPost(`/user/apply/content`, { id });
}

export async function apiGetApplyCount(userId, vip) {
	return await apiGet(`/api/applys/applyCount`, { params: { userId, vip } });
}

export async function apiSearch(category, keyword) {
	return await apiGet('/searchs', { params: { category, keyword } });
}

export async function apiRgetRecommendProduct() {
	return await apiGet('/recommend/product');
}

export async function apiRgetRecommendProject(payload) {
	return await apiGet('/recommend/project', { params: payload });
}

export async function apiStatistics(payload) {
	return await apiPost('/statistics', payload);
}
