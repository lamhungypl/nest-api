import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderStatusController } from './order-status.controller';
import { OrderStatusRepository } from './order-status.repository';
import { OrderStatusService } from './order-status.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderStatusRepository])],
  controllers: [OrderStatusController],
  providers: [OrderStatusService],
  exports: [OrderStatusService],
})
export class OrderStatusModule {}
