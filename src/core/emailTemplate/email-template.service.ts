import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../common/base.service';
import { EmailTemplate } from './email-template.entity';
import { EmailTemplateRepository } from './email-template.repository';

@Injectable()
export class EmailTemplateService extends BaseService<
  EmailTemplate,
  EmailTemplateRepository
> {
  constructor(
    @InjectRepository(EmailTemplateRepository)
    repository: EmailTemplateRepository,
  ) {
    super(repository);
  }
}
