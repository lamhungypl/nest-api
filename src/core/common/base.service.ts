import {
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  ObjectID,
  Repository,
  UpdateResult,
} from 'typeorm';
import { BaseModel } from './base.model';

export interface BaseServiceImpl<T> {
  create(newModel: T): Promise<T>;

  update(id: number | string, newModel: T): Promise<UpdateResult>;

  findOne(options?: FindOneOptions<T>): Promise<T | undefined>;
  findOneById(
    id?: string | number | Date | ObjectID,
    options?: FindOneOptions<T>,
  ): Promise<T | undefined>;

  delete(id: number | string): Promise<number>;

  list(options: FindManyOptions<T>): Promise<T[]>;
  count(options: FindManyOptions<T>): Promise<number>;
  findAndCount(options: FindManyOptions<T>): Promise<[T[], number]>;
}

export class BaseService<T extends BaseModel, R extends Repository<T>>
  implements BaseServiceImpl<T> {
  public readonly repository: R;

  constructor(repository: R) {
    this.repository = repository;
  }

  public create(newModel: T) {
    return this.repository.save(newModel as any);
  }

  public update(id: number | string, newModel: T) {
    return this.repository.save(newModel as any);
  }

  public findOne(options?: FindOneOptions<T>) {
    return this.repository.findOne(options);
  }

  public findOneById(
    id?: string | number | Date | ObjectID,
    options?: FindOneOptions<T>,
  ) {
    return this.repository.findOne(id, options);
  }

  public async delete(
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectID
      | ObjectID[]
      | FindConditions<T>,
  ) {
    try {
      await this.repository.delete(criteria);
      return 1;
    } catch (error) {
      return -1;
    }
  }

  public list(options: FindManyOptions<T>) {
    return this.repository.find(options);
  }

  public count(options: FindManyOptions<T>) {
    return this.repository.count(options);
  }

  public findAndCount(options?: FindManyOptions<T>) {
    return this.repository.findAndCount(options);
  }
}
