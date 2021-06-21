import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSpecialService } from './product-special.service';
import { ProductSpecialRepository } from './product-special.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductSpecialRepository])],
  providers: [ProductSpecialService],
  exports: [ProductSpecialService],
})
export class ProductSpecialModule {}
