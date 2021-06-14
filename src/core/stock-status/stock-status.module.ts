import { Module } from '@nestjs/common';
import { StockStatusService } from './stock-status.service';

@Module({
  providers: [StockStatusService],
})
export class StockStatusModule {}
