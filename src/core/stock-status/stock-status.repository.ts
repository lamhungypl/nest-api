import { BaseRepository } from '@modules/common/base.repository';
import { EntityRepository } from 'typeorm';

import { StockStatus } from './stock-status.entity';

@EntityRepository(StockStatus)
export class StockStatusRepository extends BaseRepository<StockStatus> {}
