import { BaseModel } from '@modules/common/base.model';
import { CustomerWishlist } from '@modules/customerWishlist';
import { OrderProduct } from '@modules/order-product';
import { ProductImage } from '@modules/product-image';
import { ProductToCategory } from '@modules/productToCategory';

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
@Entity('product')
export class Product extends BaseModel {
  @PrimaryGeneratedColumn({ name: 'product_id' })
  @IsNotEmpty()
  public productId: number;

  @Column({ name: 'sku' })
  public sku: string;

  @Column({ name: 'upc' })
  public upc: string;

  @Column({ name: 'location' })
  public location: string;

  @Column({ name: 'quantity' })
  public quantity: number;

  @Column({ name: 'minimum_quantity' })
  public minimumQuantity: number;

  @Column({ name: 'subtract_stock' })
  public subtractStock: number;

  @IsNotEmpty()
  @Column({ name: 'stock_status_id' })
  public stockStatusId: number;

  @Column({ name: 'image' })
  public image: string;

  @Column({ name: 'image_path' })
  public imagePath: string;

  @Column({ name: 'manufacturer_id' })
  public manufacturerId: number;

  @Column({ name: 'shipping' })
  public shipping: number;

  @IsNotEmpty()
  @Column({ name: 'price' })
  public price: number;

  @Column({ name: 'date_available' })
  public dateAvailable: Date;

  @Column({ name: 'sort_order' })
  public sortOrder: number;

  @Column({ name: 'name' })
  public name: string;

  @Column({ name: 'description' })
  public description: string;

  @Column({ name: 'amount' })
  public amount: number;

  @Column({ name: 'meta_tag_title' })
  public metaTagTitle: string;

  @Column({ name: 'meta_tag_description' })
  public metaTagDescription: string;

  @Column({ name: 'meta_tag_keyword' })
  public metaTagKeyword: string;

  @Column({ name: 'discount' })
  public discount: number;

  @Column({ name: 'delete_flag' })
  public deleteFlag: number;

  @Column({ name: 'is_featured' })
  public isFeatured: number;

  @Column({ name: 'today_deals' })
  public todayDeals: number;

  @Column({ name: 'condition' })
  public condition: number;

  @Column({ name: 'rating' })
  public rating: number;

  @Column({ name: 'wishlist_status' })
  public wishListStatus: number;

  @Column({ name: 'is_active' })
  public isActive: number;

  @OneToMany(
    (type) => ProductToCategory,
    (productToCategory) => productToCategory.product,
  )
  public productToCategory: ProductToCategory[];

  @OneToMany((type) => ProductImage, (productImage) => productImage.product)
  public productImage: ProductImage[];

  @OneToMany(
    (type) => CustomerWishlist,
    (customerWishlist) => customerWishlist.product,
  )
  public wishlist: CustomerWishlist[];

  // @OneToMany(
  //   type => ProductRelated,
  //   productRelated => productRelated.productRelated
  // )
  // public relatedproduct: ProductRelated[];

  // @OneToMany(type => ProductRating, productRating => productRating.product)
  // public productRating: ProductRating[];

  @OneToMany(
    (type) => OrderProduct,
    (orderProduct) => orderProduct.productInformationDetail,
  )
  public orderProduct: OrderProduct[];
}
