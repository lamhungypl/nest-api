import { OrderProduct } from '@modules/order-product/order-product.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions } from 'typeorm';
import { BaseService } from '../common/base.service';
import { Product } from './product.entity';
import { ProductRepository } from './product.repository';

export interface FindManyProductOptions extends FindManyOptions<Product> {
  categoryId?: string;
  priceOrder?: 1 | 'ASC' | 'DESC' | -1;
}

@Injectable()
export class ProductService extends BaseService<Product, ProductRepository> {
  constructor(
    @InjectRepository(ProductRepository) repository: ProductRepository,
  ) {
    super(repository);
  }

  public async productList(
    options: FindManyProductOptions,
  ): Promise<Product[]> {
    // const { categoryId, priceOrder, ...optionsFind } = options;

    const products = await this.repository.find(options);

    return products;
  }

  public async productCount(
    options: FindManyOptions<Product>,
  ): Promise<number> {
    // const { categoryId, priceOrder, ...optionsFind } = options;

    const products = await this.repository.count(options);

    return products;
  }

  public async recentProductSelling(limit: number): Promise<Product[]> {
    const query = this.repository.manager.createQueryBuilder(
      OrderProduct,
      'orderProduct',
    );
    query.select([
      'COUNT(orderProduct.order_id) as orderCount',
      'orderProduct.product_id as product',
    ]);
    query.groupBy('product');
    query.orderBy('orderCount', 'DESC');
    query.limit(limit);

    return query.getRawMany();
  }

  public async productMaxPrice({
    take,
    skip,
    join,
    ...options
  }: FindManyOptions<Product>): Promise<number> {
    const query = this.repository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.productToCategory', 'productToCategory')
      .where(options.where)
      .select('MAX(product.price)', 'maxPrice');

    // if (take) {
    //   query.limit(take);
    // }
    // if (skip) {
    //   query.offset(skip);
    // }

    const { maxPrice } = await query.getRawOne();

    return maxPrice;
  }
}
