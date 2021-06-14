import { Setting } from '@modules/setting/setting.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class addSettings1623664694843 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const newSetting = new Setting();
    newSetting.url = 'www.ere.com';
    newSetting.metaTagTitle = 'e shop commerce';
    newSetting.metaTagDescription = 'description';
    newSetting.metaTagKeyword = 'keyword';
    newSetting.storeName = 'online shopping site';
    newSetting.storeOwner = 'admin';
    newSetting.storeEmail = 'admin@commerce.com';
    await queryRunner.manager.save(newSetting);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
