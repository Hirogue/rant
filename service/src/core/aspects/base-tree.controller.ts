import { Get, Param } from "@nestjs/common";
import { BaseTreeService } from "./base-tree.service";
import { BaseController } from "./base.controller";
import { ApiOperation } from "@nestjs/swagger";

const PREFIX = 'tree';

export abstract class BaseTreeController<T> extends BaseController<T> {
    constructor(public readonly service: BaseTreeService<T>) {
        super(service);
    }

    @Get(`${PREFIX}/trees`)
    @ApiOperation({ title: 'Returns all trees in the database with all their children, children of children.' })
    async trees() {
        return this.service.findTrees();
    }

    @Get(`${PREFIX}/roots`)
    @ApiOperation({ title: 'Roots are entities that have no ancestors. Finds them all. Does not load children leafs.' })
    async roots() {
        return this.service.findRoots();
    }

    @Get(`${PREFIX}/children/:id`)
    @ApiOperation({ title: 'Gets all children of the given entity. Returns them all in a flat array.' })
    async children(@Param('id') id: string) {
        return this.service.findChildren(id);
    }

    @Get(`${PREFIX}/descendants/:id`)
    @ApiOperation({ title: 'Gets all descendants of the given entity. Returns them all in a flat array.' })
    async descendants(@Param('id') id: string) {
        return this.service.findDescendants(id);
    }

    @Get(`${PREFIX}/descendantsTree/:id`)
    @ApiOperation({ title: ' Gets all descendants of the given entity. Returns them in a tree - nested into each other.' })
    async descendantsTree(@Param('id') id: string) {
        return this.service.findDescendantsTree(id);
    }

    @Get(`${PREFIX}/countDescendants/:id`)
    @ApiOperation({ title: 'Gets number of descendants of the entity.' })
    async countDescendants(@Param('id') id: string) {
        return this.service.countDescendants(id);
    }

    @Get(`${PREFIX}/ancestors/:id`)
    @ApiOperation({ title: 'Gets all parent (ancestors) of the given entity. Returns them all in a flat array.' })
    async ancestors(@Param('id') id: string) {
        return this.service.findAncestors(id);
    }

    @Get(`${PREFIX}/ancestorsTree/:id`)
    @ApiOperation({ title: 'Gets all parent (ancestors) of the given entity. Returns them in a tree - nested into each other.' })
    async ancestorsTree(@Param('id') id: string) {
        return this.service.findAncestorsTree(id);
    }

    @Get(`${PREFIX}/countAncestors/:id`)
    @ApiOperation({ title: 'Gets the number of ancestors of the entity.' })
    async countAncestors(@Param('id') id: string) {
        return this.service.countAncestors(id);
    }
}