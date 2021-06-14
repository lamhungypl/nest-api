import { BaseRepository } from '@modules/common/base.repository';
import { EntityRepository } from 'typeorm';
import { OrderStatus } from './order-status.entity';

@EntityRepository(OrderStatus)
export class OrderStatusRepository extends BaseRepository<OrderStatus> {}
