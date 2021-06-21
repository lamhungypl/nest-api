import { BaseRepository } from '@modules/common/base.repository';
import { EntityRepository } from 'typeorm';
import { ProductSpecial } from './product-special.entity';

@EntityRepository(ProductSpecial)
export class ProductSpecialRepository extends BaseRepository<ProductSpecial> {}
