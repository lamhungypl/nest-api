import { BaseService } from '@modules/common/base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Language } from './language.entity';
import { LanguageRepository } from './language.repository';

@Injectable()
export class LanguageService extends BaseService<Language, LanguageRepository> {
  constructor(
    @InjectRepository(LanguageRepository)
    repository: LanguageRepository,
  ) {
    super(repository);
  }
}
