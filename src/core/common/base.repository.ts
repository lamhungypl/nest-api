import { EntityRepository, Repository } from 'typeorm';
import { BaseModel } from './base.model';

@EntityRepository()
export class BaseRepository<T extends BaseModel> extends Repository<T> {}
