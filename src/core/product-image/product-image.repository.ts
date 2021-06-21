import { BaseRepository } from '@modules/common/base.repository';
import { EntityRepository } from 'typeorm';
import { ProductImage } from './product-image.entity';

@EntityRepository(ProductImage)
export class ProductImageRepository extends BaseRepository<ProductImage> {}
