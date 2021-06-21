import { BaseService } from '@modules/common/base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { LoginLog } from './login-log.entity';
import { LoginLogRepository } from './login-log.repository';

@Injectable()
export class LoginLogService extends BaseService<LoginLog, LoginLogRepository> {
  constructor(
    @InjectRepository(LoginLogRepository)
    repository: LoginLogRepository,
  ) {
    super(repository);
  }

  public async logList(limit: number): Promise<any[]> {
    const query = this.repository.manager.createQueryBuilder(
      LoginLog,
      'LoginLog',
    );
    query.select([
      'COUNT(LoginLog.id) as logcount',
      'DATE(created_date) as createdDate',
    ]);
    query.groupBy('createdDate');
    query.orderBy('createdDate', 'DESC');
    query.limit(limit);
    //console.log({ logList: query.getQuery() });
    return query.getRawMany();
  }
}
