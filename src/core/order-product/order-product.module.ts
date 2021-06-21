import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderProductRepository } from './order-product.repository';
import { OrderProductService } from './order-product.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderProductRepository])],
  providers: [OrderProductService],
  exports: [OrderProductService],
})
export class OrderProductModule {}
