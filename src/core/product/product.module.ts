import { OrderProductModule } from '@modules/order-product';
import { ProductDiscountModule } from '@modules/product-discount';
import { ProductImageModule } from '@modules/product-image';
import { ProductSpecialModule } from '@modules/product-special';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductRepository]),
    OrderProductModule,
    ProductDiscountModule,
    ProductSpecialModule,
    ProductImageModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
