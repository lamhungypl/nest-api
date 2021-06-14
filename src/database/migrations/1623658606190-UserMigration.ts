import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class UserMigration1623658606190 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: 'users',
      columns: [
        {
          name: 'user_id',
          type: 'int',
          width: 11,
          isPrimary: true,
          isNullable: false,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'user_group_id',
          type: 'int',
          width: 11,
          isPrimary: false,
          isNullable: false,
        },
        {
          name: 'username',
          type: 'varchar',
          length: '255',
          isPrimary: false,
          isNullable: true,
        },
        {
          name: 'password',
          type: 'varchar',
          length: '255',
          isPrimary: false,
          isNullable: true,
        },
        {
          name: 'first_name',
          type: 'varchar',
          length: '255',
          isPrimary: false,
          isNullable: true,
        },
        {
          name: 'last_name',
          type: 'varchar',
          length: '255',
          isPrimary: false,
          isNullable: true,
        },
        {
          name: 'email',
          type: 'varchar',
          length: '255',
          isPrimary: false,
          isNullable: true,
        },
        {
          name: 'avatar',
          type: 'varchar',
          length: '255',
          isPrimary: false,
          isNullable: true,
        },
        {
          name: 'avatar_path',
          type: 'varchar',
          length: '255',
          isPrimary: false,
          isNullable: true,
        },
        {
          name: 'code',
          type: 'varchar',
          length: '32',
          isPrimary: false,
          isNullable: true,
        },
        {
          name: 'ip',
          type: 'varchar',
          length: '15',
          isPrimary: false,
          isNullable: true,
        },
        {
          name: 'phone_number',
          type: 'varchar',
          length: '10',
          isPrimary: false,
          isNullable: true,
        },
        {
          name: 'address',
          type: 'varchar',
          length: '255',
          isPrimary: false,
          isNullable: true,
        },
        {
          name: 'is_active',
          type: 'int',
          width: 11,
          isPrimary: false,
          isNullable: true,
        },
        {
          name: 'created_date',
          type: 'date',
          isPrimary: false,
          isNullable: true,
          default: 'CURRENT_TIMESTAMP',
        },
        {
          name: 'modified_date',
          type: 'date',
          isPrimary: false,
          isNullable: true,
          default: 'CURRENT_TIMESTAMP',
        },
        {
          name: 'created_by',
          type: 'int',
          width: 11,
          isPrimary: false,
          isNullable: true,
        },
        {
          name: 'modified_by',
          type: 'int',
          width: 11,
          isPrimary: false,
          isNullable: true,
        },
      ],
    });
    const existed = await queryRunner.hasTable('users');
    if (!existed) {
      await queryRunner.createTable(table);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users', true);
  }
}
