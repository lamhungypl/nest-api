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
import { AddressServices } from 'src/services/address/address.services';
import { CreateAddress } from './address.constant';
// import { CustomerService } from 'src/services/customer/customer.services';

@Controller('/address')
export class AddressController {
  constructor(
    private readonly addressService: AddressServices, // private readonly customerService: CustomerService,
  ) {}
  @Post('/add-address')
  public async createAddress(
    @Body() addressParams: CreateAddress,
    @Res() response: Response,
  ) {
    return response.status(200).send({ message: 'create address' });
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
    return response.status(200).send({ message: 'list address' });
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
