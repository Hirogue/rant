import { Controller } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { BaseTreeController } from '../core';
import { Metadata } from '../database';
import { MetadataService } from './metadata.service';

@ApiUseTags('metadata')
@Controller('/api/metadata')
export class MetadataController extends BaseTreeController(Metadata) {
  constructor(public service: MetadataService) {
    super(service);
  }
}
