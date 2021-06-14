import { BaseService } from '@modules/common/base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserGroup } from './user-group.entity';
import { UserGroupRepository } from './user-group.repository';

@Injectable()
export class UserGroupService extends BaseService<
  UserGroup,
  UserGroupRepository
> {
  constructor(
    @InjectRepository(UserGroupRepository)
    repository: UserGroupRepository,
  ) {
    super(repository);
  }
}
