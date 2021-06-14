import { BaseModel } from '@modules/common/base.model';
import { User } from '@modules/user/user.entity';
import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { format } from 'date-fns';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user_group')
export class UserGroup extends BaseModel {
  @PrimaryGeneratedColumn({ name: 'group_id' })
  public groupId: number;

  @IsNotEmpty()
  @Column({ name: 'name' })
  public name: string;

  @Exclude()
  @IsNotEmpty()
  @Column({ name: 'slug' })
  public slug: string;

  @Exclude()
  @Column({ name: 'is_active' })
  public isActive: number;

  @OneToMany((type) => User, (user) => user.usergroup)
  public users: User[];

  @BeforeInsert()
  public async createDetails(): Promise<void> {
    this.createdDate = format(new Date(), 'YYYY-MM-DD HH:mm:ss');
  }

  @BeforeUpdate()
  public async updateDetails(): Promise<void> {
    this.modifiedDate = format(new Date(), 'YYYY-MM-DD HH:mm:ss');
  }
}
