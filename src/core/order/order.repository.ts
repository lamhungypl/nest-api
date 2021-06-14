import { BaseRepository } from '@modules/common/base.repository';
import { EntityRepository } from 'typeorm';
import { Order } from './order.entity';

@EntityRepository(Order)
export class OrderRepository extends BaseRepository<Order> {}
