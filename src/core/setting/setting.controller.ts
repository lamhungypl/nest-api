import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { FindManyOptions } from 'typeorm';
import { Setting } from './setting.entity';

import { SettingService } from './setting.service';

@Controller('settings')
export class SettingController {
  constructor(private settingService: SettingService) {}
  @Get('/get-settings')
  public async settingsList(@Res() response: Response) {
    const options: FindManyOptions<Setting> = {
      take: 1,
    };
    const settings: any = await this.settingService.list(options);
    //console.log('settings' + settings);
    const successResponse: any = {
      status: 1,
      message: 'Successfully get settings',
      data: settings,
    };
    return response.status(200).send(successResponse);
  }
}
