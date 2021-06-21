import { BaseService } from '@modules/common/base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderProduct } from './order-product.entity';
import { OrderProductRepository } from './order-product.repository';

@Injectable()
export class OrderProductService extends BaseService<
  OrderProduct,
  OrderProductRepository
> {
  constructor(
    @InjectRepository(OrderProductRepository)
    repository: OrderProductRepository,
  ) {
    super(repository);
  }
}
