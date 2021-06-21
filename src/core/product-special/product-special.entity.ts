import { BaseModel } from '@modules/common/base.model';
import { format } from 'date-fns';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('product_special')
export class ProductSpecial extends BaseModel {
  @PrimaryGeneratedColumn({ name: 'product_special_id' })
  public productSpecialId: number;

  @Column({ name: 'product_id' })
  public productId: number;

  @Column({ name: 'customer_group_id' })
  public customerGroupId: number;

  @Column({ name: 'priority' })
  public priority: number;

  @Column({ name: 'price' })
  public price: number;

  @Column({ name: 'date_start' })
  public dateStart: Date;

  @Column({ name: 'date_end' })
  public dateEnd: Date;

  @BeforeInsert()
  public async createDetails(): Promise<void> {
    this.createdDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
  }

  @BeforeUpdate()
  public async updateDetails(): Promise<void> {
    this.modifiedDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
  }
}
