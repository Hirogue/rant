import { AccessAction } from '@/utils/access-control';

export default [
  {
    name: '工作台',
    value: '/dashboard/workplace',
  },
  {
    name: '数据分析',
    value: '/dashboard/analysis',
  },
  {
    name: '内容管理',
    value: '/contents',
    children: [
      {
        name: '文章管理',
        value: '/contents/articles',
        children: [
          {
            name: '文章列表',
            value: '/article',
            route: '/contents/articles/list',
          },
          {
            name: '文章分类',
            value: '/article/category',
            route: '/contents/articles/category',
          },
        ],
      },
      {
        name: '产品管理',
        value: '/contents/products',
        children: [
          {
            name: '产品列表',
            value: '/product',
            route: '/contents/products/list',
          },
          {
            name: '产品分类',
            value: '/product/category',
            route: '/contents/products/category',
          },
        ],
      },
      {
        name: '文档管理',
        value: '/contents/documents',
        children: [
          {
            name: '文档列表',
            value: '/document',
            route: '/contents/documents/list',
          },
          {
            name: '文档分类',
            value: '/document/category',
            route: '/contents/documents/category',
          },
        ],
      },
      {
        name: '轮播图',
        value: '/carousel',
        route: '/contents/carousels/list',
      },
      {
        name: '成功案例',
        value: '/success-case',
        route: '/contents/success-cases/list',
      },
      {
        name: '专家团队',
        value: '/expert',
        route: '/contents/experts/list',
      },
      {
        name: '搜索引擎优化',
        value: '/seo',
        route: '/contents/seo/list',
      },
      {
        name: '友情链接',
        value: '/link',
        route: '/contents/link/list',
      },
    ],
  },
  {
    name: '投融管理',
    value: '/if',
    children: [
      {
        name: '项目',
        value: '/project',
        route: '/if/projects/list',
      },
      {
        name: '资金',
        value: '/capital',
        route: '/if/capitals/list',
      },
    ],
  },
  {
    name: '审批管理',
    value: '/apply',
    children: [
      {
        name: '金融服务',
        value: '/apply-product',
        route: '/apply-product/list',
      },
      {
        name: '约见专家',
        value: '/apply-expert',
        route: '/apply-expert/list',
      },
    ],
  },
  {
    name: '服务商管理',
    value: '/providers',
    children: [
      {
        name: '服务商列表',
        value: '/provider',
        route: '/providers/list',
      },
      {
        name: '服务商分类',
        value: '/provider/category',
        route: '/providers/category',
      },
    ],
  },
  {
    name: '用户管理',
    value: '/users',
    children: [
      {
        name: '后台用户',
        value: '/user/admin',
        route: '/users/admin/list',
      },
      {
        name: '项目方',
        value: '/user/customer',
        route: '/users/customer/list',
      },
    ],
  },
  {
    name: '权限管理',
    value: '/role',
    route: '/role/list',
  },
  {
    name: '组织架构',
    value: '/org',
  },
  {
    name: '元数据',
    value: '/metadata',
  },
  {
    name: '设置',
    value: '/settings',
  },
];
