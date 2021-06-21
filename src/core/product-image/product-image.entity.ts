import { BaseModel } from '@modules/common/base.model';
import { Product } from '@modules/product/product.entity';
import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
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

@Entity('product_image')
export class ProductImage extends BaseModel {
  @PrimaryGeneratedColumn({ name: 'product_image_id' })
  @IsNotEmpty()
  public productImageId: number;

  @Column({ name: 'product_id' })
  public productId: number;

  @Column({ name: 'image' })
  public image: string;

  @Column({ name: 'container_name' })
  public containerName: string;

  @Exclude()
  @Column({ name: 'sort_order' })
  public sortOrder: number;

  @Column({ name: 'default_image' })
  public defaultImage: number;

  @Exclude()
  @Column({ name: 'is_active' })
  public isActive: number;

  @ManyToOne((type) => Product, (product) => product.productImage)
  @JoinColumn({ name: 'product_id' })
  public product: Product;

  @BeforeInsert()
  public async createDetails(): Promise<void> {
    this.createdDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
  }

  @BeforeUpdate()
  public async updateDetails(): Promise<void> {
    this.modifiedDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
  }
}
