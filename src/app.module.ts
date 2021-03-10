import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AddressModule } from './core/address/address.module';

@Module({
  imports: [TypeOrmModule.forRoot(), AddressModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
