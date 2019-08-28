import { Injectable, OnModuleInit } from "@nestjs/common";
import { AccessControl } from 'accesscontrol';
import { Logger } from "../logger";

@Injectable()
export class AccessControlService implements OnModuleInit {

    private readonly ac: AccessControl;

    constructor() {
        this.ac = new AccessControl();
    }

    async onModuleInit() {
        Logger.trace('AccessControl settings grants ...');

        const grantList = [
            { role: 'admin', resource: 'video', action: 'create:any', attributes: '*, !views' },
            { role: 'admin', resource: 'video', action: 'read:any', attributes: '*' },
            { role: 'admin', resource: 'video', action: 'update:any', attributes: '*, !views' },
            { role: 'admin', resource: 'video', action: 'delete:any', attributes: '*' },

            { role: 'user', resource: 'video', action: 'create:own', attributes: '*, !rating, !views' },
            { role: 'user', resource: 'video', action: 'read:any', attributes: '*' },
            { role: 'user', resource: 'video', action: 'update:own', attributes: '*, !rating, !views' },
            { role: 'user', resource: 'video', action: 'delete:own', attributes: '*' }
        ];

        this.ac.setGrants(grantList);

    }
}