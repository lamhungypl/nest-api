import { BaseRepository } from '@modules/common/base.repository';
import { EntityRepository } from 'typeorm';
import { Setting } from './setting.entity';

@EntityRepository(Setting)
export class SettingRepository extends BaseRepository<Setting> {}
