import { BaseRepository } from '@modules/common/base.repository';
import { EntityRepository } from 'typeorm';
import { Product } from './product.entity';

@EntityRepository(Product)
export class ProductRepository extends BaseRepository<Product> {}
