import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

const key = '123##$$)(***&';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),

    JwtModule.register({
      secret: key,
      signOptions: { expiresIn: '86400s' },
    }),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
