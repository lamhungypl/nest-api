import { BaseRepository } from '@modules/common/base.repository';
import { EntityRepository } from 'typeorm';
import { OrderProduct } from './order-product.entity';

@EntityRepository(OrderProduct)
export class OrderProductRepository extends BaseRepository<OrderProduct> {}
