import { LoginLogService } from '@modules/login-log';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { classToPlain } from 'class-transformer';
import { format } from 'date-fns';
import { Request, Response } from 'express';
import { notNullObject } from 'src/utils/common.utils';
import { FindConditions, FindManyOptions, Like } from 'typeorm';
import { Customer } from './customer.entity';
import { CustomerService } from './customer.service';

@Controller('/customer')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,

    private loginLogService: LoginLogService,
  ) {}

  @Post('/add-customer')
  public async createBanner(
    @Body() productParam: any,
    @Res() response: Response,
  ) {
    const data = await this.customerService.list({});
    return response
      .status(200)
      .send({ message: 'create customer', data: data });
  }

  @Put('/update-customer/:id')
  public async updateAddress(
    @Body() productParam: any,
    @Param('id') id: number,
    @Res() response: Response,
    @Req() request: Request,
  ) {
    return response.status(200).send({ message: 'update customer' });
  }

  @Get('/customer-list')
  public async addressList(
    @Query('limit') limit: string,
    @Query('offset') offset: string,
    @Query('name') name: string,
    @Query('status') status: string,
    @Query('email') email: string,
    @Query('customerGroup') customerGroup: string,
    @Query('date') date: string,
    @Query('count') count: number | boolean,
    @Res() response: Response,
    @Req() request: Request,
  ) {
    const options: FindManyOptions<Customer> = {
      ...notNullObject<FindManyOptions<Customer>>({
        take: (limit && parseInt(limit)) || undefined,
        skip: (offset && parseInt(offset)) || undefined,
      }),
      select: [
        'id',
        'username',
        'firstName',
        'lastName',
        'email',
        'address',
        'mobileNumber',
        'avatar',
        'avatarPath',
        'newsletter',
        'mailStatus',
        'isActive',
        'modifiedDate',
        'customerGroupId',
        'createdDate',
      ],
      where: notNullObject<FindConditions<Customer>>({
        firstName: (name && Like(`%${name}%`)) || undefined,
        email: (email && Like(`%${email}%`)) || undefined,
        createdDate: (date && Like(`%${date}%`)) || undefined,
        customerGroupId: Number.isInteger(parseInt(customerGroup))
          ? parseInt(customerGroup)
          : undefined,
        isActive: Number.isInteger(parseInt(status))
          ? parseInt(status)
          : undefined,
        deleteFlag: 0,
      }),
    };

    if (count) {
      const customerCount = await this.customerService.count(options);
      const successResponse = {
        status: 1,
        message: 'Successfully got Customer list count',
        data: customerCount,
      };
      return response.status(200).send(successResponse);
    }
    const customerList = await this.customerService.list(options);

    const successResponse = {
      status: 1,
      message: 'Successfully got Customer list.',
      data: customerList,
    };

    return response.status(200).send(successResponse);
  }

  @Get('/recent-customerlist')
  public async recentCustomerList(@Res() response: Response): Promise<any> {
    const customerList = await this.customerService.list({
      where: {
        deleteFlag: 0,
      },
      order: {
        createdDate: 1,
      },
    });
    const successResponse: any = {
      status: 1,
      message: 'Successfully got Customer list.',
      data: classToPlain(customerList),
    };

    return response.status(200).send(successResponse);
  }

  @Get('/login-log-list')
  public async LogList(
    @Query('limit') limit: number,
    @Res() response: any,
  ): Promise<any> {
    const loginLogList = await this.loginLogService.logList(limit);
    const promise = loginLogList.map(async (result: any) => {
      const createdDate = format(new Date(), 'yyyy-MM-dd');
      const temp: any = result;
      temp.createdDate = createdDate;
      return temp;
    });
    const finalResult = await Promise.all(promise);
    const successResponse: any = {
      status: 1,
      message: 'Successfully get login Log list',
      data: finalResult,
    };
    return response.status(200).send(successResponse);
  }

  @Delete('/delete-customer/:id')
  public async deleteAddress(
    @Param('id') id: number,
    @Res() response: Response,
    @Req() request: Request,
  ) {
    return response.status(200).send({ message: 'delete customer' + id });
  }
}
