import { BaseModel } from '@modules/common/base.model';
import { ProductToCategory } from '@modules/productToCategory/productToCategory.entity';
import { format } from 'date-fns';

import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('category')
export class Category extends BaseModel {
  @PrimaryGeneratedColumn({ name: 'category_id' })
  public categoryId: number;

  @Column({ name: 'name' })
  public name: string;

  @Column({ name: 'image' })
  public image: string;

  @Column({ name: 'image_path' })
  public imagePath: string;

  @Column({ name: 'parent_int' })
  public parentInt: number;

  @Column({ name: 'sort_order' })
  public sortOrder: number;

  @Column({ name: 'meta_tag_title' })
  public metaTagTitle: string;

  @Column({ name: 'meta_tag_description' })
  public metaTagDescription: string;

  @Column({ name: 'meta_tag_keyword' })
  public metaTagKeyword: string;

  @Column({ name: 'is_active' })
  public isActive: number;

  @OneToMany(
    (type) => ProductToCategory,
    (productToCategory) => productToCategory.category,
  )
  public productToCategory: ProductToCategory[];

  @BeforeInsert()
  public async createDetails(): Promise<void> {
    this.createdDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
  }

  @BeforeUpdate()
  public async updateDetails(): Promise<void> {
    this.modifiedDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
  }
}
