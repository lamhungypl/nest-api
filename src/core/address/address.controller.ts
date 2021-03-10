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
import { AddressService } from './address.service';

import { CreateAddress } from './interfaces/address.interface';
// import { CustomerService } from 'src/services/customer/customer.services';

@Controller('/address')
export class AddressController {
  constructor(
    private readonly addressService: AddressService, // private readonly customerService: CustomerService,
  ) {}

  @Post('/add-address')
  public async createAddress(
    @Body() addressParams: CreateAddress,
    @Res() response: Response,
  ) {
    const data = await this.addressService.list({});
    return response.status(200).send({ message: 'create address', data: data });
  }

  @Put('/update-address/:id')
  public async updateAddress(
    @Body() addressParams: CreateAddress,
    @Param('id') id: number,
    @Res() response: Response,
    @Req() request: Request,
  ) {
    return response.status(200).send({ message: 'update address' });
  }

  @Get('/address-list')
  public async addressList(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
    @Query('count') count: number | boolean,

    @Res() response: Response,
    @Req() request: Request,
  ) {
    const data = await this.addressService.list({});

    return response.status(200).send({ message: 'list address', data: data });
  }

  @Delete('/delete-address/:id')
  public async deleteAddress(
    @Param('id') id: number,
    @Res() response: Response,
    @Req() request: Request,
  ) {
    return response.status(200).send({ message: 'delete address' + id });
  }
}
