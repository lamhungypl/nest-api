import { BaseModel } from '@modules/common/base.model';
import { Order } from '@modules/order/order.entity';
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

@Entity('order_status')
export class OrderStatus extends BaseModel {
  @PrimaryGeneratedColumn({ name: 'order_status_id' })
  public orderStatusId: number;

  @IsNotEmpty()
  @Column({ name: 'name' })
  public name: string;

  @Column({ name: 'is_active' })
  public isActive: number;

  @OneToMany((type) => Order, (order) => order.orderStatus)
  public statusOfOrder: Order[];

  @Column({ name: 'color_code' })
  public colorCode: string;

  @BeforeInsert()
  public async createDetails(): Promise<void> {
    this.createdDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
  }

  @BeforeUpdate()
  public async updateDetails(): Promise<void> {
    this.modifiedDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
  }
}
