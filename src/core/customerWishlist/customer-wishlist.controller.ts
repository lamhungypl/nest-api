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
import { CustomerWishlistService } from './customer-wishlist.service';

@Controller('/customer-wishlist')
export class CustomerWishlistController {
  constructor(
    private readonly customerWishlistService: CustomerWishlistService,
  ) {}

  @Post('/add-customer-wishlist')
  public async createBanner(
    @Body() productParam: any,
    @Res() response: Response,
  ) {
    const data = await this.customerWishlistService.list({});
    return response
      .status(200)
      .send({ message: 'create customerWishlist', data: data });
  }

  @Put('/update-customer-wishlist/:id')
  public async updateAddress(
    @Body() productParam: any,
    @Param('id') id: number,
    @Res() response: Response,
    @Req() request: Request,
  ) {
    return response.status(200).send({ message: 'update customerWishlist' });
  }

  @Get('/list')
  public async addressList(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
    @Query('count') count: number | boolean,

    @Res() response: Response,
    @Req() request: Request,
  ) {
    const data = await this.customerWishlistService.list({});

    return response
      .status(200)
      .send({ message: 'list customerWishlist', data: data });
  }

  @Delete('/delete-customer-wishlist/:id')
  public async deleteAddress(
    @Param('id') id: number,
    @Res() response: Response,
    @Req() request: Request,
  ) {
    return response
      .status(200)
      .send({ message: 'delete customerWishlist' + id });
  }
}
