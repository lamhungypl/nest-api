import { User } from '@modules/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class addUserMigration1623661736145 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const newUser = new User();
    newUser.username = 'admin@picart.com';
    newUser.firstName = 'Admin';
    newUser.password = await User.hashPassword('cart123@');

    await queryRunner.manager.save(newUser);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
