import { OrderStatusModule } from '@modules/order-status/order-status.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderRepository]), OrderStatusModule],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
