import { Controller } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { BaseController } from '../core';
import { Role } from '../database';
import { RoleService } from './role.service';

@ApiUseTags('role')
@Controller('/api/role')
export class RoleController extends BaseController(Role) {
  constructor(public service: RoleService) {
    super(service);
  }
}
