import { Get, Param } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { CrudOptions } from "@nestjsx/crud";
import { ClassType } from "type-graphql";
import { BaseTreeService } from "./base-tree.service";
import { BaseController } from "./base.controller";

const PREFIX = 'tree';

export function BaseTreeController<TEntity>(
    TEntityClass: ClassType<TEntity>,
    options: Partial<CrudOptions> = {}
): any {

    abstract class BaseTreeController<TEntity> extends BaseController(TEntityClass, options) {
        constructor(public service: BaseTreeService<TEntity>) {
            super(service);
        }

        @Get(`${PREFIX}/tree/:id`)
        @ApiOperation({ title: `Get ${TEntityClass.name} tree` })
        async tree(@Param('id') id: string) {
            return this.service.findTree(id);
        }

        @Get(`${PREFIX}/trees`)
        @ApiOperation({ title: `Get all ${TEntityClass.name} trees` })
        async trees() {
            return this.service.findTrees();
        }

        // @Get(`${PREFIX}/roots`)
        // @ApiOperation({ title: 'Roots are entities that have no ancestors. Finds them all. Does not load children leafs.' })
        // async roots() {
        //     return this.service.findRoots();
        // }

        @Get(`${PREFIX}/children/:id`)
        @ApiOperation({ title: 'Gets all children of the given entity. Returns them all in a flat array.' })
        async children(@Param('id') id: string) {
            return this.service.findChildren(id);
        }

        // @Get(`${PREFIX}/descendants/:id`)
        // @ApiOperation({ title: 'Gets all descendants of the given entity. Returns them all in a flat array.' })
        // async descendants(@Param('id') id: string) {
        //     return this.service.findDescendants(id);
        // }

        @Get(`${PREFIX}/descendants/:id`)
        @ApiOperation({ title: `Get ${TEntityClass.name} descendants` })
        async descendants(@Param('id') id: string) {
            return this.service.findDescendants(id);
        }

        @Get(`${PREFIX}/descendantsTree/:root`)
        @ApiOperation({ title: `Get ${TEntityClass.name} descendants tree` })
        async descendantsTree(@Param('root') root: string) {
            return this.service.findDescendantsTree(root);
        }

        @Get(`${PREFIX}/descendantsTrees/:id`)
        @ApiOperation({ title: `Get ${TEntityClass.name} descendants trees` })
        async descendantsTrees(@Param('id') id: string) {
            return this.service.findDescendantsTrees(id);
        }

        // @Get(`${PREFIX}/countDescendants/:id`)
        // @ApiOperation({ title: 'Gets number of descendants of the entity.' })
        // async countDescendants(@Param('id') id: string) {
        //     return this.service.countDescendants(id);
        // }

        // @Get(`${PREFIX}/ancestors/:id`)
        // @ApiOperation({ title: 'Gets all parent (ancestors) of the given entity. Returns them all in a flat array.' })
        // async ancestors(@Param('id') id: string) {
        //     return this.service.findAncestors(id);
        // }

        // @Get(`${PREFIX}/ancestorsTree/:id`)
        // @ApiOperation({ title: 'Gets all parent (ancestors) of the given entity. Returns them in a tree - nested into each other.' })
        // async ancestorsTree(@Param('id') id: string) {
        //     return this.service.findAncestorsTree(id);
        // }

        // @Get(`${PREFIX}/countAncestors/:id`)
        // @ApiOperation({ title: 'Gets the number of ancestors of the entity.' })
        // async countAncestors(@Param('id') id: string) {
        //     return this.service.countAncestors(id);
        // }
    }

    return BaseTreeController;
}