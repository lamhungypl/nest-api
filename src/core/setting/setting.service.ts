import { BaseService } from '@modules/common/base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Setting } from './setting.entity';
import { SettingRepository } from './setting.repository';

@Injectable()
export class SettingService extends BaseService<Setting, SettingRepository> {
  constructor(
    @InjectRepository(SettingRepository)
    repository: SettingRepository,
  ) {
    super(repository);
  }
}
