import { BaseRepository } from '@modules/common/base.repository';
import { EntityRepository } from 'typeorm';
import { ProductDiscount } from './product-discount.entity';

@EntityRepository(ProductDiscount)
export class ProductDiscountRepository extends BaseRepository<ProductDiscount> {}
