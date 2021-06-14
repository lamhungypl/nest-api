import { BaseService } from '@modules/common/base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService extends BaseService<Order, OrderRepository> {
  constructor(
    @InjectRepository(OrderRepository)
    repository: OrderRepository,
  ) {
    super(repository);
  }
}
