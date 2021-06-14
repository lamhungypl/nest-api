import { BaseService } from '@modules/common/base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StockStatus } from './stock-status.entity';
import { StockStatusRepository } from './stock-status.repository';

@Injectable()
export class StockStatusService extends BaseService<
  StockStatus,
  StockStatusRepository
> {
  constructor(
    @InjectRepository(StockStatusRepository)
    repository: StockStatusRepository,
  ) {
    super(repository);
  }
}
