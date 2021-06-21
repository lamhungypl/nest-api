import { BaseService } from '@modules/common/base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductSpecial } from './product-special.entity';
import { ProductSpecialRepository } from './product-special.repository';

@Injectable()
export class ProductSpecialService extends BaseService<
  ProductSpecial,
  ProductSpecialRepository
> {
  constructor(
    @InjectRepository(ProductSpecialRepository)
    repository: ProductSpecialRepository,
  ) {
    super(repository);
  }

  public async findSpecialPrice(
    productId: number,
    todayDate: string,
  ): Promise<any> {
    const query = this.repository.manager.createQueryBuilder(
      ProductSpecial,
      'productSpecial',
    );
    query.select(['productSpecial.price as price']);
    query.where('productSpecial.product_id = ' + productId);
    query.andWhere(
      '(productSpecial.dateStart <= :todayDate AND productSpecial.dateEnd >= :todayDate)',
      { todayDate },
    );
    query.orderBy('productSpecial.priority', 'ASC');
    query.addOrderBy('productSpecial.price', 'ASC');
    query.limit(1);
    //console.log({ findSpecialPrice: query.getQuery() });
    return query.getRawOne();
  }
}
