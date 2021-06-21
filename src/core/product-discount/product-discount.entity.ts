import { BaseModel } from '@modules/common/base.model';
import { format } from 'date-fns';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('product_discount')
export class ProductDiscount extends BaseModel {
  @PrimaryGeneratedColumn({ name: 'product_discount_id' })
  public productDiscountId: number;

  @Column({ name: 'product_id' })
  public productId: number;

  @Column({ name: 'quantity' })
  public quantity: number;

  @Column({ name: 'priority' })
  public priority: number;

  @Column({ name: 'price' })
  public price: number;

  @Column({ name: 'is_active' })
  public isActive: number;

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
