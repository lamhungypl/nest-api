import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../common/base.service';
import { Product } from './product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService extends BaseService<Product, ProductRepository> {
  constructor(
    @InjectRepository(ProductRepository) repository: ProductRepository,
  ) {
    super(repository);
  }
}
