import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { Authority } from "../entities";

export default class implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {

        await factory(Authority)({ name: '工作台', value: '/dashboard/workplace' }).seed();

        await factory(Authority)({ name: '数据分析', value: '/dashboard/analysis' }).seed();

        const content = await factory(Authority)({ name: '内容管理', value: '/contents' }).seed();

        await factory(Authority)({
            name: '轮播图',
            value: '/contents/carousels/list',
            parent: content
        }).seed();

        await factory(Authority)({
            name: '成功案例',
            value: '/contents/success-cases/list',
            parent: content
        }).seed();

        await factory(Authority)({
            name: '专家团队',
            value: '/contents/experts/list',
            parent: content
        }).seed();

        await factory(Authority)({
            name: '搜索引擎优化',
            value: '/contents/seo/list',
            parent: content
        }).seed();

        const article = await factory(Authority)({
            name: '文章管理',
            value: '/contents/articles',
            parent: content
        }).seed();

        await factory(Authority)({
            name: '文章列表',
            value: '/contents/articles/list',
            parent: article
        }).seed();

        await factory(Authority)({
            name: '文章分类',
            value: '/contents/articles/category',
            parent: article
        }).seed();

        const document = await factory(Authority)({
            name: '文档管理',
            value: '/contents/documents',
            parent: content
        }).seed();

        await factory(Authority)({
            name: '文档列表',
            value: '/contents/documents/list',
            parent: document
        }).seed();

        await factory(Authority)({
            name: '文档分类',
            value: '/contents/documents/category',
            parent: document
        }).seed();

        const investmentFinancing = await factory(Authority)({
            name: '投融管理',
            value: '/if',
        }).seed();

        await factory(Authority)({
            name: '项目',
            value: '/if/projects/list',
            parent: investmentFinancing
        }).seed();

        await factory(Authority)({
            name: '资金',
            value: '/if/capitals/list',
            parent: investmentFinancing
        }).seed();

        const provider = await factory(Authority)({
            name: '服务商管理',
            value: '/providers'
        }).seed();

        await factory(Authority)({
            name: '服务商列表',
            value: '/providers/list',
            parent: provider
        }).seed();

        await factory(Authority)({
            name: '服务商分类',
            value: '/providers/category',
            parent: provider
        }).seed();

        const product = await factory(Authority)({
            name: '产品管理',
            value: '/products'
        }).seed();

        await factory(Authority)({
            name: '产品列表',
            value: '/products/list',
            parent: product
        }).seed();

        await factory(Authority)({
            name: '产品分类',
            value: '/products/category',
            parent: product
        }).seed();

        await factory(Authority)({
            name: '组织架构',
            value: '/org'
        }).seed();

        const ac = await factory(Authority)({
            name: '权限管理',
            value: '/accesss-control'
        }).seed();

        await factory(Authority)({
            name: '角色列表',
            value: '/accesss-control/role/list',
            parent: ac
        }).seed();

        const user = await factory(Authority)({
            name: '用户管理',
            value: '/users'
        }).seed();

        await factory(Authority)({
            name: '用户列表',
            value: '/users',
            parent: user
        }).seed();

        await factory(Authority)({
            name: '元数据',
            value: '/metadata'
        }).seed();

        await factory(Authority)({
            name: '设置',
            value: '/settings'
        }).seed();

    }
}
