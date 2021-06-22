import { Get, ParseBoolPipe, Query, Res } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { Response } from 'express';
import { parseInt } from 'lodash';
import { notNullObject } from 'src/utils/common.utils';
import { FindManyOptions, Like } from 'typeorm';
import { OrderStatus } from './order-status.entity';
import { OrderStatusService } from './order-status.service';

@Controller('order-status')
export class OrderStatusController {
  constructor(private orderStatusService: OrderStatusService) {}

  @Get('/order-status-list')
  public async orderStatusList(
    @Query('limit') limit: string,
    @Query('offset') offset: string,
    @Query('keyword') keyword: string,
    @Query('count', ParseBoolPipe) count: number | boolean,
    @Res() response: Response,
  ): Promise<any> {
    const options = {
      ...notNullObject<FindManyOptions<OrderStatus>>({
        take: parseInt(limit) || undefined,
        skip: parseInt(offset) || undefined,
        select: ['orderStatusId', 'name', 'colorCode', 'isActive'],
        where: { name: Like(`%${keyword || ''}%`) },
      }),
    };

    if (count) {
      const orderStatusCount = await this.orderStatusService.count(options);
      const successResponse: any = {
        status: 1,
        message: 'Successfully got the complete order status list.',
        data: orderStatusCount,
      };
      return response.status(200).send(successResponse);
    }
    const orderStatusList = await this.orderStatusService.list(options);
    if (orderStatusList) {
      const successResponse: any = {
        status: 1,
        message: 'Successfully got the complete order status list.',
        data: orderStatusList,
      };
      return response.status(200).send(successResponse);
    } else {
      const errorResponse: any = {
        status: 1,
        message: 'unable to get OrderStatus.',
      };
      return response.status(400).send(errorResponse);
    }
  }
}
