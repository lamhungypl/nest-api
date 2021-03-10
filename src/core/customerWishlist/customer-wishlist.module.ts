import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerWishlistController } from './customer-wishlist.controller';
import { CustomerWishlistRepository } from './customer-wishlist.repository';
import { CustomerWishlistService } from './customer-wishlist.service';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerWishlistRepository])],
  controllers: [CustomerWishlistController],
  providers: [CustomerWishlistService],
})
export class CustomerWishlistModule {}
