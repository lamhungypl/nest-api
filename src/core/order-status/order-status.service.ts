import { BaseService } from '@modules/common/base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderStatus } from './order-status.entity';
import { OrderStatusRepository } from './order-status.repository';

@Injectable()
export class OrderStatusService extends BaseService<
  OrderStatus,
  OrderStatusRepository
> {
  constructor(
    @InjectRepository(OrderStatusRepository)
    repository: OrderStatusRepository,
  ) {
    super(repository);
  }
}
