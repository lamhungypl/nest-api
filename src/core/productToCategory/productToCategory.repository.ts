import { BaseRepository } from '@modules/common/base.repository';
import { EntityRepository } from 'typeorm';
import { ProductToCategory } from './productToCategory.entity';

@EntityRepository(ProductToCategory)
export class ProductToCategoryRepository extends BaseRepository<ProductToCategory> {}
