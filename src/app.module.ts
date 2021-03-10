import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AddressModule } from './core/address/address.module';
import { BannerModule } from '@modules/banner/banner.module';

@Module({
  imports: [TypeOrmModule.forRoot(), AddressModule, BannerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
