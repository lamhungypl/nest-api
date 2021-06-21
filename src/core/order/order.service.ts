import { BaseService } from '@modules/common/base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService extends BaseService<Order, OrderRepository> {
  constructor(
    @InjectRepository(OrderRepository)
    repository: OrderRepository,
  ) {
    super(repository);
  }

  public async salesList() {
    const query = this.repository.manager.createQueryBuilder(Order, 'order');
    query.select([
      'COUNT(order_id) as orderCount',
      'MONTH(created_date) as month',
      'YEAR(created_date) as year',
    ]);
    query.groupBy('month');
    query.addGroupBy('year');
    query.orderBy('year', 'ASC');
    query.addOrderBy('month', 'ASC');
    query.limit(12);
    return query.getRawMany();
  }

  public async findAllTodayOrderCount(todayDate: string) {
    const query = this.repository.manager.createQueryBuilder(Order, 'order');
    query.select(['COUNT(order.orderId) as orderCount']);
    query.where('DATE(order.createdDate) = :todayDate', { todayDate });
    return query.getRawOne<number>();
  }
}
