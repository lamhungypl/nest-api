import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../common/base.service';
import { CustomerWishlist } from './customer-wishlist.entity';
import { CustomerWishlistRepository } from './customer-wishlist.repository';

@Injectable()
export class CustomerWishlistService extends BaseService<
  CustomerWishlist,
  CustomerWishlistRepository
> {
  constructor(
    @InjectRepository(CustomerWishlistRepository)
    repository: CustomerWishlistRepository,
  ) {
    super(repository);
  }
}
