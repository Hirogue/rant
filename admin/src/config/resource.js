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
    name: '产品管理',
    value: '/products',
    children: [
      {
        name: '产品列表',
        value: '/product',
        route: '/products/list',
      },
      {
        name: '产品分类',
        value: '/product/category',
        route: '/products/category',
      },
    ],
  },
  {
    name: '组织架构',
    value: '/org',
  },
  {
    name: '权限管理',
    value: '/accesss-control',
    children: [
      {
        name: '角色列表',
        value: '/role',
        route: '/accesss-control/role/list',
      },
    ],
  },
  {
    name: '用户管理',
    value: '/users',
    children: [
      {
        name: '用户列表',
        value: '/user',
        route: '/users/list',
      },
    ],
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
