import { BaseModel } from '@modules/common/base.model';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { format } from 'date-fns';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('login_log')
export class LoginLog extends BaseModel {
  @PrimaryGeneratedColumn()
  public id: number;

  @IsNotEmpty()
  @Column({ name: 'customer_id' })
  public customerId: number;

  @IsEmail()
  @Column({ name: 'email_id' })
  public emailId: string;

  @Column({ name: 'first_name' })
  public firstName: string;

  @Column({ name: 'ip_address' })
  public ipAddress: string;

  @BeforeInsert()
  public async hashPassword(): Promise<void> {
    this.createdDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
  }

  @BeforeUpdate()
  public async updateDetails(): Promise<void> {
    this.modifiedDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
  }
}
