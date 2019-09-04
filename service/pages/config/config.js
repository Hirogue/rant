export default {
	apiUrl: process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:3000' : 'http://www.lvyoto.com',
	pathRoot: '',
	iconUrl: 'https://at.alicdn.com/t/font_1052359_axgl91fsv1r.js',
	staticImgUrl: '/static/img/',
	hotLine: '0791-87705085',
	navMenus: [
		{ name: '首页', url: '/' },
		{ name: '项目招商', url: '/project' },
		{ name: '金融资本', url: '/finance' },
		{ name: '配套服务', url: '/service' },
		{ name: '政策资讯', url: '/news' },
		{ name: '江旅金融', url: '/product' },
		{ name: '关于我们', url: '/about' },
		{ name: '赣游通', url: 'http://2b.tolvyo.com/Login/Index' },
	]
};
