import { BaseService } from '@modules/common/base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductToCategory } from './productToCategory.entity';
import { ProductToCategoryRepository } from './productToCategory.repository';

@Injectable()
export class ProductToCategoryService extends BaseService<
  ProductToCategory,
  ProductToCategoryRepository
> {
  constructor(
    @InjectRepository(ProductToCategoryRepository)
    repository: ProductToCategoryRepository,
  ) {
    super(repository);
  }
}
