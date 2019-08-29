import { TreeRepository } from "typeorm";
import { BaseService } from "./base.service";

export abstract class BaseTreeService<T> extends BaseService<T> {

    constructor(protected readonly repository: TreeRepository<T>) {
        super(repository);
    }

    async findTree(id: string) {
        return await this.findOne(id);
    }

    async findParentById(id: string) {

        return await this.repository.findOne(id);
    }

    async findChildren(id: string) {

        return await this.repository.createQueryBuilder('t')
            .leftJoin('t.parent', 'p')
            .where(`p.id = :id`, { id })
            .getMany();
    }

    /**
     * 返回数据库中所有树，包括所有孩子，孩子的孩子等。
     */
    async findTrees() {

        return this.repository.findTrees();
    }

    /**
     * 返回数据库中所有树根，根是没有祖先的实体。不加载后代节点。
     */
    async findRoots() {

        return this.repository.findRoots();
    }

    /**
     * 获取给定实体的所有子项（后代）。将它们全部返回到平面数组中。
     */
    async findDescendants(id: string) {
        return this.repository.findDescendants(await this.findParentById(id));
    }

    /**
     * 获取给定实体的所有子项（后代）。在树中返回它们 - 彼此嵌套。
     */
    async findDescendantsTree(root: string) {
        const target = await this.repository.findDescendantsTree(await this.findOne({ where: { title: root } }));
        return target ? target['children'] : [];
    }

    /**
     * 获取给定实体的所有子项（后代）。在树中返回它们 - 彼此嵌套。
     */
    async findDescendantsTrees(id: string) {
        const target = await this.repository.findDescendantsTree(await this.findOne(id));
        return [target];
    }

    /**
     * 获取实体的后代数。 
     */
    async countDescendants(id: string) {

        return this.repository.countDescendants(await this.findParentById(id));
    }

    /**
     * 获取给定实体的所有父（祖先）。将它们全部返回到平面数组中。
     */
    async findAncestors(id: string) {

        return this.repository.findAncestors(await this.findParentById(id));
    }

    /**
     * 获取给定实体的所有父（祖先）。在树中返回它们 - 彼此嵌套。  
     */
    async findAncestorsTree(id: string) {

        return this.repository.findAncestorsTree(await this.findParentById(id));
    }

    /**
     * 获取实体的祖先数。
     */
    async countAncestors(id: string) {

        return this.repository.countAncestors(await this.findParentById(id));
    }
}