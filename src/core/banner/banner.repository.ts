import { BaseRepository } from '@modules/common/base.repository';
import { EntityRepository } from 'typeorm';
import { Banner } from './banner.entity';

@EntityRepository(Banner)
export class BannerRepository extends BaseRepository<Banner> {}
