import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImageService } from './product-image.service';
import { ProductImageRepository } from './product-image.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductImageRepository])],
  providers: [ProductImageService],
})
export class ProductImageModule {}
