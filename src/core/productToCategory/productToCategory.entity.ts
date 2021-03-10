import { Category } from '@modules/category/category.entity';
import { BaseModel } from '@modules/common/base.model';
import { Product } from '@modules/product/product.entity';
import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('product_to_category')
export class ProductToCategory extends BaseModel {
  @PrimaryGeneratedColumn({ name: 'product_to_category_id' })
  @IsNotEmpty()
  public productToCategoryId: number;

  @Exclude()
  @Column({ name: 'product_id' })
  public productId: number;

  @Column({ name: 'category_id' })
  public categoryId: number;

  @Exclude()
  @Column({ name: 'is_active' })
  public isActive: number;

  @ManyToOne((type) => Product, (product) => product.productToCategory)
  @JoinColumn({ name: 'product_id' })
  public product: Product;

  @ManyToOne((type) => Category, (category) => category.productToCategory)
  @JoinColumn({ name: 'category_id' })
  public category: Category;
}
