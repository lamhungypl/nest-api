import { BaseService } from '@modules/common/base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductImage } from './product-image.entity';
import { ProductImageRepository } from './product-image.repository';

@Injectable()
export class ProductImageService extends BaseService<
  ProductImage,
  ProductImageRepository
> {
  constructor(
    @InjectRepository(ProductImageRepository)
    repository: ProductImageRepository,
  ) {
    super(repository);
  }
}
