import { BaseService } from '@modules/common/base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDiscount } from './product-discount.entity';
import { ProductDiscountRepository } from './product-discount.repository';

@Injectable()
export class ProductDiscountService extends BaseService<
  ProductDiscount,
  ProductDiscountRepository
> {
  constructor(
    @InjectRepository(ProductDiscountRepository)
    repository: ProductDiscountRepository,
  ) {
    super(repository);
  }

  public async findDiscountPrice(
    productId: number,
    todayDate: string,
  ): Promise<any> {
    const query = this.repository.manager.createQueryBuilder(
      ProductDiscount,
      'productDiscount',
    );
    query.select(['productDiscount.price as price']);
    query.where('productDiscount.productId = ' + productId);
    query.andWhere(
      '(productDiscount.dateStart <= :todayDate AND productDiscount.dateEnd >= :todayDate)',
      { todayDate },
    );
    query.orderBy('productDiscount.priority', 'ASC');
    query.addOrderBy('productDiscount.price', 'ASC');
    query.limit(1);
    //console.log({ findDiscountPrice: query.getQuery() });
    return query.getRawOne();
  }
}
