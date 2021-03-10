import { BaseRepository } from '@modules/common/base.repository';
import { EntityRepository } from 'typeorm';
import { CustomerWishlist } from './customer-wishlist.entity';

@EntityRepository(CustomerWishlist)
export class CustomerWishlistRepository extends BaseRepository<CustomerWishlist> {}
