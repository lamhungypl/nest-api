import { OrderService } from '@modules/order';
import { OrderProductService } from '@modules/order-product';
import { ProductDiscountService } from '@modules/product-discount';
import { ProductImageService } from '@modules/product-image';
import { ProductSpecialService } from '@modules/product-special';
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
import { Request, Response } from 'express';
import { isNumber, parseInt, pickBy } from 'lodash';
import { FindManyOptions, Like } from 'typeorm';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Controller('/product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private productImageService: ProductImageService,
    private productDiscountService: ProductDiscountService,
    private productSpecialService: ProductSpecialService,
    private orderService: OrderService,
    private orderProductService: OrderProductService,
  ) {}

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

  @Get('/productlist')
  public async addressList(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
    @Query('count') count: number | boolean,
    @Query('sku') sku: string,
    @Query('keyword') keyword: string,
    @Query('status') status: string,

    @Res() response: Response,
    @Req() request: Request,
  ) {
    const relation = ['productToCategory'];

    const options: FindManyOptions<Product> = {
      ...pickBy<{ take?: number; skip?: number }>(
        {
          take: limit || undefined,
          skip: offset || undefined,
        },
        (value) => isNumber(value),
      ),
      select: [
        'productId',
        'sku',
        'name',
        'quantity',
        'price',
        'image',
        'imagePath',
        'isFeatured',
        'todayDeals',
        'isActive',
      ],
      relations: relation,
      where: pickBy(
        {
          name: (keyword && Like(`%${keyword}%`)) || undefined,
          sku: (sku && Like(`%${sku}%`)) || undefined,

          isActive: (status && parseInt(status)) || 1,
        },
        (value) => value != null,
      ),
    };

    if (count) {
      const productCount = await this.productService.productCount(options);

      const successRes: any = {
        status: 1,
        message: 'Successfully got count ',
        data: productCount,
      };
      return response.status(200).send(successRes);
    }
    const productLists: Product[] = await this.productService.productList(
      options,
    );

    const productList = productLists.map(async (value: Product) => {
      const defaultValue = await this.productImageService.findOne({
        where: {
          productId: value.productId,
          defaultImage: 1,
        },
      });
      const temp: any = value;
      const nowDate = new Date();
      const todaydate =
        nowDate.getFullYear() +
        '-' +
        (nowDate.getMonth() + 1) +
        '-' +
        nowDate.getDate();
      const productSpecial = { price: 0 };
      // const productSpecial = await this.productSpecialService.findSpecialPrice(
      //   value.productId,
      //   todaydate,
      // );
      const productDiscount = { price: 0 };
      // const productDiscount = await this.productDiscountService.findDiscountPrice(
      //   value.productId,
      //   todaydate,
      // );
      if (productSpecial !== undefined) {
        temp.pricerefer = productSpecial.price;
        temp.flag = 1;
      } else if (productDiscount !== undefined) {
        temp.pricerefer = productDiscount.price;
        temp.flag = 0;
      }
      temp.productImage = defaultValue;
      return temp;
    });
    const results = await Promise.all(productList);

    const successResponse = {
      status: 1,
      message: 'Successfully got the complete product list. ',
      data: classToPlain(results),
    };
    return response.status(200).send(successResponse);
  }

  @Get('/top-selling-productlist')
  /**
   * topSelling
   */
  public async topSellingProductList(
    @Req() request: any,
    @Res() response: Response,
  ) {
    const data = await this.productService.recentProductSelling(4);
    const promise = data.map(async (result: any) => {
      const product = await this.productService.findOne({
        select: [
          'productId',
          'image',
          'imagePath',
          'price',
          'name',
          'description',
        ],
        where: { productId: result.product },
      });
      // const temp: any = result;
      const productImage = await this.productImageService.list({
        select: ['productId', 'image', 'containerName'],
        where: {
          productId: result.product,
          defaultImage: 1,
        },
      });
      // temp.product = product;
      // temp.productImage = productImage;
      return { ...result, product, productImage };
    });

    const value = await Promise.all(promise);

    const successResponse: any = {
      status: 1,
      message: 'Successfully get Top Selling Product..!',
      data: value,
    };
    return response.status(200).send(successResponse);
  }

  @Get('/recent-selling-product')
  public async sellingProduct(
    @Req() request: any,
    @Res() response: any,
  ): Promise<any> {
    const limit = 3;
    const orderList = await this.orderProductService.list({ take: limit });
    const promises = orderList.map(async (result: any) => {
      const order = await this.orderService.list({
        select: ['invoiceNo', 'invoicePrefix', 'orderId', 'orderStatusId'],
        where: { orderId: result.orderId },
      });
      // const temp: any = result;
      // temp.order = order;
      const productImage = await this.productImageService.list({
        where: {
          productId: result.productId,
          defaultImage: 1,
        },
      });
      // temp.productImage = product;
      return { ...result, order, productImage };
    });
    const results = await Promise.all(promises);
    const successResponse: any = {
      status: 1,
      message: 'successfully listed recently selling products..!',
      data: results,
    };
    return response.status(200).send(successResponse);
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
