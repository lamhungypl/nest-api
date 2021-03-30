import { BaseRepository } from '@modules/common/base.repository';
import { EntityRepository } from 'typeorm';
import { Language } from './language.entity';

@EntityRepository(Language)
export class LanguageRepository extends BaseRepository<Language> {}
