import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AccessControl } from 'accesscontrol';
import { Repository } from "typeorm";
import { Role } from "../database";
import { Logger } from "../logger";

@Injectable()
export class AccessControlService implements OnModuleInit {

    private readonly ac: AccessControl;

    constructor(
        @InjectRepository(Role)
        private readonly roleRepos: Repository<Role>
    ) {
        this.ac = new AccessControl();
    }

    async onModuleInit() {
        Logger.trace('AccessControl loading grants ...');
        await this.loadGrants();
        Logger.trace('AccessControl loaded grants ...');
    }

    async loadGrants() {
        const grants = {};
        const roles = await this.roleRepos.find();

        roles.forEach(role => grants[role.id] = role.grants ? role.grants : {});
        this.ac.setGrants(grants);

    }
}