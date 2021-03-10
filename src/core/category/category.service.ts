import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../common/base.service';
import { Category } from './category.entity';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService extends BaseService<Category, CategoryRepository> {
  constructor(
    @InjectRepository(CategoryRepository) repository: CategoryRepository,
  ) {
    super(repository);
  }
}
