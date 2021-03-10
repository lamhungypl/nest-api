import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AddressModule } from './core/address/address.module';
import { BannerModule } from '@modules/banner/banner.module';
import { CategoryModule } from '@modules/category/category.module';
import { ProductModule } from '@modules/product/product.module';
import { CustomerModule } from '@modules/customer/customer.module';
import { CustomerWishlistModule } from '@modules/customerWishlist/customer-wishlist.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AddressModule,
    BannerModule,
    CategoryModule,
    ProductModule,
    CustomerModule,
    CustomerWishlistModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
