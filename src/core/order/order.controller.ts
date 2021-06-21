import { OrderStatusService } from '@modules/order-status';
import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { pickBy, parseInt as _parseInt, isNumber, toNumber } from 'lodash';
import { FindManyOptions, Like, MoreThan } from 'typeorm';
import { Order } from './order.entity';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(
    private orderService: OrderService,
    private orderStatusService: OrderStatusService,
  ) {}

  @Get('order-list')
  /**
   * orderList
   */
  public async orderList(@Query() orderQuery: any, @Res() response: Response) {
    const {
      limit,
      offset,
      orderId,
      orderStatusId,
      customerName,
      dateAdded,
      count,
      totalAmount,
    } = orderQuery;

    const options: FindManyOptions<Order> = {
      ...pickBy<{ take?: number; skip?: number }>(
        {
          take: (limit && _parseInt(limit)) || undefined,
          skip: (offset && _parseInt(offset)) || undefined,
        },
        (value) => isNumber(value),
      ),
      where: pickBy(
        {
          orderPrefixId: (orderId && Like(`%${orderId}%`)) || undefined,
          orderStatusId: orderStatusId || undefined,
          shippingFirstname:
            (customerName && Like(`%${customerName}%`)) || undefined,
          createdDate: (dateAdded && Like(`%${dateAdded}%`)) || undefined,
          total: (totalAmount && MoreThan(toNumber(totalAmount))) || undefined,
        },
        (value) => value != null,
      ),
    };
    if (count) {
      const orderCount = await this.orderService.count(options);
      const res = {
        status: 1,
        message: 'Successfully got count.',
        data: orderCount,
      };
      return response.status(200).send(res);
    }
    const orderList = await this.orderService.list(options);

    const orderStatus = orderList.map(async (value) => {
      // OrderList API

      const status = await this.orderStatusService.findOne({
        where: { orderStatusId: value.orderStatusId },
        select: ['orderStatusId', 'name', 'colorCode'],
      });
      const temp = value;
      temp.orderStatus = status;
      return temp;
    });
    const results = await Promise.all(orderStatus);
    const successResponse = {
      status: 1,
      message: 'Successfully got the complete order list.',
      data: results,
    };
    return response.status(200).send(successResponse);
  }

  @Get('saleslist')
  /**
   * salesList
   */
  public async salesList(@Res() response: Response) {
    const orderList = await this.orderService.salesList();

    //console.log(orderList);
    const promises = orderList.map(async (result: any) => {
      const monthNames = [
        '',
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      const temp: any = result;
      temp.monthYear = monthNames[result.month] + '-' + result.year;
      return temp;
    });
    const finalResult = await Promise.all(promises);
    const successResponse: any = {
      status: 1,
      message: 'Successfully get sales count List',
      data: finalResult,
    };
    return response.status(200).send(successResponse);
  }
}
