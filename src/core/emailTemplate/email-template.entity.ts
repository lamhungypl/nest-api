import { BaseModel } from '@modules/common/base.model';

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('email_template')
export class EmailTemplate extends BaseModel {
  @PrimaryGeneratedColumn({ name: 'id' })
  public emailTemplateId: number;

  @Column({ name: 'shortname' })
  public title: string;

  @Column({ name: 'subject' })
  public subject: string;

  @Column({ name: 'message' })
  public content: string;

  @Column({ name: 'is_active' })
  public isActive: number;
}
