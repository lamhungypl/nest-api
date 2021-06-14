import { BaseService } from '@modules/common/base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService extends BaseService<User, UserRepository> {
  constructor(
    @InjectRepository(UserRepository)
    repository: UserRepository,
  ) {
    super(repository);
  }
}
