import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginLogRepository } from './login-log.repository';
import { LoginLogService } from './login-log.service';

@Module({
  imports: [TypeOrmModule.forFeature([LoginLogRepository])],
  providers: [LoginLogService],
  exports: [LoginLogService],
})
export class LoginLogModule {}
