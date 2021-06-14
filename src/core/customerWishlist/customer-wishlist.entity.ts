import { BaseModel } from '@modules/common/base.model';
import { Product } from '@modules/product/product.entity';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
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
@Entity('customer_wishlist')
export class CustomerWishlist extends BaseModel {
  @PrimaryGeneratedColumn({ name: 'id' })
  public wishlistProductId: number;

  @Exclude()
  @IsNotEmpty()
  @Column({ name: 'customer_id' })
  public customerId: number;

  @Exclude()
  @IsNotEmpty()
  @Column({ name: 'product_id' })
  public productId: string;

  @Exclude()
  @Column({ name: 'is_active' })
  public isActive: number;

  @ManyToOne((type) => Product, (product) => product.wishlist)
  @JoinColumn({ name: 'product_id' })
  public product: Product;

  // @BeforeInsert()
  // public async createDetails(): Promise<void> {
  //   this.createdDate = moment().format('yyyy-MM-dd HH:mm:ss');
  // }

  // @BeforeUpdate()
  // public async updateDetails(): Promise<void> {
  //   this.modifiedDate = moment().format('yyyy-MM-dd HH:mm:ss');
  // }
}
