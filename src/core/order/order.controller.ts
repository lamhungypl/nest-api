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

  @Get('/today-order-amount')
  public async todayOrderAmount(@Res() response: any): Promise<any> {
    const nowDate = new Date();
    const todaydate =
      nowDate.getFullYear() +
      '-' +
      (nowDate.getMonth() + 1) +
      '-' +
      nowDate.getDate();
    //console.log(todaydate);

    try {
      console.log('todaydate', todaydate);

      const orderTotal = await this.orderService.findAllTodayOrder(todaydate);
      console.log({ orderTotal });
      const successResponse: any = {
        status: 1,
        message: 'Successfully get today order Amount',
        data: orderTotal || 0,
      };

      return response.status(200).send(successResponse);
    } catch (error) {
      const errorResponse: any = {
        status: 0,
        message: 'unable to get today order amount',
      };
      return response.status(400).send(errorResponse);
    }
  }

  @Get('/today-order-count')
  public async orderCount(@Res() response: any): Promise<any> {
    const nowDate = new Date();
    const todaydate =
      nowDate.getFullYear() +
      '-' +
      (nowDate.getMonth() + 1) +
      '-' +
      nowDate.getDate();

    const orderCount = await this.orderService.findAllTodayOrderCount(
      todaydate,
    );
    const successResponse: any = {
      status: 1,
      message: 'Successfully get Today order count',
      data: orderCount,
    };
    return response.status(200).send(successResponse);
  }

  @Get('/total-order-amount')
  public async totalOrderAmount(@Res() response: any): Promise<any> {
    let total = 0;
    const order = await this.orderService.list({});
    let n = 0;
    for (n; n < order.length; n++) {
      total += +order[n].total;
    }
    if (order) {
      const successResponse: any = {
        status: 1,
        message: 'Successfully get total order Amount',
        data: total,
      };

      return response.status(200).send(successResponse);
    } else {
      const errorResponse: any = {
        status: 0,
        message: 'unable to get total order amount',
      };
      return response.status(400).send(errorResponse);
    }
  }
}
