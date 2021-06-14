import { BaseRepository } from '@modules/common/base.repository';
import { EntityRepository } from 'typeorm';

import { UserGroup } from './user-group.entity';

@EntityRepository(UserGroup)
export class UserGroupRepository extends BaseRepository<UserGroup> {}
