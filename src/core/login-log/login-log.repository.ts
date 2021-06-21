import { BaseRepository } from '@modules/common/base.repository';
import { EntityRepository } from 'typeorm';
import { LoginLog } from './login-log.entity';

@EntityRepository(LoginLog)
export class LoginLogRepository extends BaseRepository<LoginLog> {}
