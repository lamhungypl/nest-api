import { BaseModel } from '@modules/common/base.model';
import { Order } from '@modules/order/order.entity';
import { Product } from '@modules/product/product.entity';
import { format } from 'date-fns';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('order_product')
export class OrderProduct extends BaseModel {
  @PrimaryGeneratedColumn({ name: 'order_product_id' })
  public orderProductId: number;

  @Column({ name: 'product_id' })
  public productId: number;

  @Column({ name: 'order_id' })
  public orderId: number;

  @Column({ name: 'name' })
  public name: string;

  @Column({ name: 'model' })
  public model: string;

  @Column({ name: 'quantity' })
  public quantity: number;

  @Column({ name: 'product_price' })
  public productPrice: number;

  @Column({ name: 'total' })
  public total: number;

  @ManyToOne((type) => Product, (product) => product.orderProduct)
  @JoinColumn({ name: 'product_id' })
  public productInformationDetail: Product;

  @ManyToOne((type) => Order, (order) => order.productlist)
  @JoinColumn({ name: 'order_id' })
  public product: Order;

  @BeforeInsert()
  public async createDetails(): Promise<void> {
    this.createdDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
  }

  @BeforeUpdate()
  public async updateDetails(): Promise<void> {
    this.modifiedDate = format(new Date(), 'yyyy-MM-DD HH:mm:ss');
  }
}
