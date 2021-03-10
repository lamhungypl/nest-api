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
import { Request, Response } from 'express';
import { CustomerService } from './customer.service';

@Controller('/customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

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
    @Query('limit') limit: number,
    @Query('offset') offset: number,
    @Query('count') count: number | boolean,

    @Res() response: Response,
    @Req() request: Request,
  ) {
    const data = await this.customerService.list({});

    return response.status(200).send({ message: 'list customer', data: data });
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
