import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../common/base.service';
import { Banner } from './banner.entity';
import { BannerRepository } from './banner.repository';

@Injectable()
export class BannerService extends BaseService<Banner, BannerRepository> {
  constructor(
    @InjectRepository(BannerRepository) repository: BannerRepository,
  ) {
    super(repository);
  }
}
