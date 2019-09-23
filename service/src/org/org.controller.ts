import { Controller } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { BaseTreeController } from '../core';
import { Org } from '../database';
import { OrgService } from './org.service';

@ApiUseTags('org')
@Controller('/api/org')
export class OrgController extends BaseTreeController(Org) {
  constructor(public service: OrgService) {
    super(service);
  }
}
