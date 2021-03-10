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
import { BannerService } from './banner.service';
import { CreateBanner, UpdateBanner } from './interfaces/banner.interface';

@Controller('/banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Post('/add-banner')
  public async createBanner(
    @Body() bannerParam: CreateBanner,
    @Res() response: Response,
  ) {
    const data = await this.bannerService.list({});
    return response.status(200).send({ message: 'create banner', data: data });
  }

  @Put('/update-banner/:id')
  public async updateAddress(
    @Body() bannerParam: UpdateBanner,
    @Param('id') id: number,
    @Res() response: Response,
    @Req() request: Request,
  ) {
    return response.status(200).send({ message: 'update banner' });
  }

  @Get('/banner-list')
  public async addressList(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
    @Query('count') count: number | boolean,

    @Res() response: Response,
    @Req() request: Request,
  ) {
    const data = await this.bannerService.list({});

    return response.status(200).send({ message: 'list banner', data: data });
  }

  @Delete('/delete-banner/:id')
  public async deleteAddress(
    @Param('id') id: number,
    @Res() response: Response,
    @Req() request: Request,
  ) {
    return response.status(200).send({ message: 'delete banner' + id });
  }
}
