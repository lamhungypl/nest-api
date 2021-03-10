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
import { ProductService } from './product.service';

@Controller('/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/add-product')
  public async createBanner(
    @Body() productParam: any,
    @Res() response: Response,
  ) {
    const data = await this.productService.list({});
    return response.status(200).send({ message: 'create product', data: data });
  }

  @Put('/update-product/:id')
  public async updateAddress(
    @Body() productParam: any,
    @Param('id') id: number,
    @Res() response: Response,
    @Req() request: Request,
  ) {
    return response.status(200).send({ message: 'update product' });
  }

  @Get('/product-list')
  public async addressList(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
    @Query('count') count: number | boolean,

    @Res() response: Response,
    @Req() request: Request,
  ) {
    const data = await this.productService.list({});

    return response.status(200).send({ message: 'list product', data: data });
  }

  @Delete('/delete-product/:id')
  public async deleteAddress(
    @Param('id') id: number,
    @Res() response: Response,
    @Req() request: Request,
  ) {
    return response.status(200).send({ message: 'delete product' + id });
  }
}
