import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductDiscountService } from './product-discount.service';
import { ProductDiscountRepository } from './product-discount.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductDiscountRepository])],
  providers: [ProductDiscountService],
})
export class ProductDiscountModule {}
