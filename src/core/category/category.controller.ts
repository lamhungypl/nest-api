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
import { CategoryService } from './category.service';

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
  public async addressList(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
    @Query('count') count: number | boolean,

    @Res() response: Response,
    @Req() request: Request,
  ) {
    const data = await this.categoryService.list({});

    return response.status(200).send({ message: 'list category', data: data });
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
