import { ImageService, S3Service } from '@modules/common/image.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguageController } from './language.controller';
import { LanguageRepository } from './language.repository';
import { LanguageService } from './language.service';

@Module({
  imports: [TypeOrmModule.forFeature([LanguageRepository])],
  controllers: [LanguageController],
  providers: [LanguageService, ImageService, S3Service],
})
export class LanguageModule {}
