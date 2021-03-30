import { Module } from '@nestjs/common';
import { ManufactureController } from './manufacture.controller';

@Module({
  controllers: [ManufactureController],
})
export class ManufactureModule {}
