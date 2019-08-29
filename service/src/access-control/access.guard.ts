import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { getAction, getFeature } from '@nestjsx/crud';
import { AccessControlService } from '.';
import { Logger } from '../logger';

@Injectable()
export class AccessGuard implements CanActivate {

    constructor(
        private readonly ac: AccessControlService,
        private readonly jwtService: JwtService
    ) { }

    canActivate(ctx: ExecutionContext): boolean {

        const req = ctx.switchToHttp().getRequest();
        if (!req) return true;

        const headers = req.headers;
        if (!headers) return true;

        const { application, authorization } = headers;

        if ('backstage' !== application) return true;
        if (!authorization) return true;

        const handler = ctx.getHandler();
        const action = getAction(handler);
        if ('Read-All' !== action) return true;

        const token = authorization.split(' ');
        if (token.length < 1) return false;

        const user = this.jwtService.verify(token[1]);
        const { role } = user;

        Logger.log('resources', this.ac.getResources());
        Logger.log('resource', req.url);
        Logger.log('role', role.id);

        return true;
    }
}