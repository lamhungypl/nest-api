import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { notNullObject } from 'src/utils/common.utils';
import { FindManyOptions, Like } from 'typeorm';
import { Category } from './category.entity';
import { CategoryService } from './category.service';

import arrayToTree from 'array-to-tree';

@Controller('/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('/add-category')
  public async createBanner(
    @Body() bannerParam: any,
    @Res() response: Response,
  ) {
    const data = await this.categoryService.list({});
    return response
      .status(200)
      .send({ message: 'create category', data: data });
  }

  @Put('/update-category/:id')
  public async updateAddress(
    @Body() bannerParam: any,
    @Param('id') id: number,
    @Res() response: Response,
    @Req() request: Request,
  ) {
    return response.status(200).send({ message: 'update category' });
  }

  @Get('/category-list')
  public async CategoryList(
    @Query('limit') limit: string,
    @Query('offset') offset: string,
    @Query('keyword') keyword: string,
    @Query('sortOrder') sortOrder: string,
    @Query('count', ParseBoolPipe) count: number | boolean,
    @Req() request: any,
    @Res() response: Response,
  ): Promise<any> {
    const options = notNullObject<FindManyOptions<Category>>({
      take: (limit && parseInt(limit)) || undefined,
      skip: (offset && parseInt(offset)) || undefined,
      select: [
        'categoryId',
        'name',
        'image',
        'imagePath',
        'parentInt',
        'sortOrder',
        'metaTagTitle',
        'metaTagDescription',
        'metaTagKeyword',
      ],
      where: {
        name: Like(`%${keyword || ''}%`),
        isActive: 1,
      },
    });

    if (count) {
      const categoryDataCount = await this.categoryService.count(options);
      const successResponse: any = {
        status: 1,
        message: 'Successfully get All category List',
        data: categoryDataCount,
      };
      return response.status(200).send(successResponse);
    } else {
      const categoryData = await this.categoryService.list(options);
      const categoryList = arrayToTree(categoryData, {
        parentProperty: 'parentInt',
        customID: 'categoryId',
      });
      const successResponse: any = {
        status: 1,
        message: 'Successfully got the list of categories.',
        data: categoryList,
      };
      return response.status(200).send(successResponse);
    }
  }

  @Delete('/delete-category/:id')
  public async deleteAddress(
    @Param('id') id: number,
    @Res() response: Response,
    @Req() request: Request,
  ) {
    return response.status(200).send({ message: 'delete category' + id });
  }
}
