import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingController } from './setting.controller';
import { SettingRepository } from './setting.repository';
import { SettingService } from './setting.service';

@Module({
  imports: [TypeOrmModule.forFeature([SettingRepository])],
  providers: [SettingService],
  controllers: [SettingController],
})
export class SettingModule {}
