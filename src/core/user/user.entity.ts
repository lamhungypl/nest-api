import { BaseModel } from '@modules/common/base.model';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Exclude } from 'class-transformer';
import { format } from 'date-fns';
import { UserGroup } from '@modules/user-group/user-group.entity';

type AccessToken = any;

@Entity('users')
export class User extends BaseModel {
  public static hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          return reject(err);
        }
        resolve(hash);
      });
    });
  }

  public static comparePassword(user: User, password: string) {
    return bcrypt.compare(password, user.password);
  }

  @PrimaryGeneratedColumn({ name: 'user_id' })
  @IsNotEmpty()
  public userId: number;

  @IsNotEmpty()
  @Exclude()
  @Column({ name: 'user_group_id' })
  public userGroupId: number;

  @Column({ name: 'username' })
  public username: string;

  @IsNotEmpty()
  @Exclude()
  @Column({ name: 'password' })
  public password: string;

  @Column({ name: 'first_name' })
  public firstName: string;

  @Column({ name: 'last_name' })
  public lastName: string;

  @IsEmail()
  @Column({ name: 'email' })
  public email: string;

  @Column({ name: 'avatar' })
  public avatar: string;

  @Column({ name: 'avatar_path' })
  public avatarPath: string;

  @Column({ name: 'is_active' })
  public isActive: number;

  @Column({ name: 'code' })
  public code: string;

  @Column({ name: 'ip' })
  public ip: string;

  @Column({ name: 'phone_number' })
  public phoneNumber: string;

  @Column({ name: 'address' })
  public address: string;

  @ManyToOne((type) => UserGroup, (usergroup) => usergroup.users)
  @JoinColumn({ name: 'user_group_id' })
  public usergroup: UserGroup;

  // @OneToMany('', (accessToken: any) => accessToken.user)
  // public accessToken: AccessToken[];

  @BeforeInsert()
  public async hashPassword(): Promise<void> {
    // this.password = await User.hashPassword(this.password);
    this.createdDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
  }

  @BeforeUpdate()
  public async updateDetails(): Promise<void> {
    this.modifiedDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
  }
}
