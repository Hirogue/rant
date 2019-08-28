const moment = require('moment');

module.exports = {
	NODE_ENV: 'development',
	API_ROOT: 'http://127.0.0.1:3000',
	SOCKET_ROOT: 'http://127.0.0.1:9000',
	SOCKET_OPTIONS: {},
	BUILD_DATE: moment().format('YYYYMMDDHHmmss'), // 编译时自动生成
	PAGE_TITLE: '旅游项目通',
	APP_NAME: 'SYS_APP_DESKTOP_ADMIN',

	COPY_RIGHT: '江西省旅游产业资本管理有限公司',

	AUTO_FETCH_LIST: [ 'maindata', 'authorities', 'organizations' ],

	DATABASE: {
		BIT_LEN_AUTH: 16
	},

	USER: {
		DEFAULT_AVATAR_URL: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
	},

	BUILD_IN_ID: {
		ROLE: {
			SUPER_ADMIN: '00000000-0000-0000-0000-999999999999'
		}
	},

	API_URL: {
		LOGIN: '/api/login',
		LOGOUT: '/api/logout',
		REGISTER: '/api/register',
		FORGOT: '/api/forgot',
		TEST: '/api/test',
		CONTENTS: '/api/contents',
		USERS: '/api/users',
		USER_CREDENTIALS: 'usercredentials',
		ORGANIZATIONS: '/api/organizations',
		PROJECTS: '/api/projects',
		SERVICES: '/api/services',
		PRODUCTS: '/api/products',
		APPLYS: '/api/applys',
		STOCKS: '/api/stocks',
		ORDERS: '/api/orders',
		ORDER_TASKS: '/api/ordertasks',
		BILLS: '/api/bills',
		TRANSACTIONS: '/api/transactions',
		APPLICATIONS: '/api/applications',
		APPLICATION_TASKS: '/api/applicationtasks',
		VERIFICATION: {
			SMS: {
				USER_REGISTER: '/api/verification/sms/register',
				PASSWORD_RESET: '/api/verification/sms'
			},
			SVG: '/api/verification/svg'
		},
		UPLOAD: {
			BACKEND_STORAGE: '/api/storage/localhost'
		}
	},

	LOCAL_URL: {
		ROOT: '/',
		LOGIN: '/user/login',
		USER_SETTING: '/studio/user/settings/base',
		USER_DETAILS: '/studio/userdetails',
		CUSTOMER_DETAILS: '/studio/customerdetails',
		ORG_DETAILS: '/studio/organizationdetails',
		CONTENT_DETAILS: '/studio/contentdetails',
		PROJECT_DETAILS: '/studio/projectdetails',
		SERVICES_DETAILS: '/studio/servicesdetails',
		PRODUCTS_DETAILS: '/studio/productsdetails',
		SPU_DETAILS: '/studio/spudetails',
		SKU_DETAILS: '/studio/skudetails',
		INVENTORY_DETAILS: '/studio/inventorydetails',
		INVENTORY_NEW: '/studio/inventorynew',
		APPLICATION_DETAILS: '/studio/applicationdetails',
		ORDER_DETAILS: '/studio/orderdetails',
		BILL_DETAILS: '/studio/billdetails'
		// USER_CENTER   : '/studio/user/center',
	},

	LOGIN_LINKS: [
		{
			key: 'help',
			title: '帮助',
			href: ''
		},
		{
			key: 'privacy',
			title: '隐私',
			href: ''
		},
		{
			key: 'terms',
			title: '条款',
			href: ''
		}
	],

	FOOTER_LINKS: [
		{
			key: '江旅项目通',
			title: '江旅项目通',
			href: 'https://pro.ant.design',
			blankTarget: true
		},
		{
			key: '江旅集团',
			title: '江旅集团',
			href: 'https://github.com/ant-design/ant-design-pro',
			blankTarget: true
		},
		{
			key: '江旅资本',
			title: '江旅资本',
			href: 'https://ant.design',
			blankTarget: true
		}
	],
	AMAP: {
		KEY: '6d03400761065ced940e1a7ef444a7b8'
	}
};
