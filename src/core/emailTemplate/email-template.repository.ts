import { BaseRepository } from '@modules/common/base.repository';
import { EntityRepository } from 'typeorm';
import { EmailTemplate } from './email-template.entity';

@EntityRepository(EmailTemplate)
export class EmailTemplateRepository extends BaseRepository<EmailTemplate> {}
